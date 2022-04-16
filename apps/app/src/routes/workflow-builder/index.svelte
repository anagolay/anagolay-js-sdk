<script context="module">
  export const prerender = false;
</script>

<script lang="ts">
  import { makeOps, type OperationsFixture } from '$src/fixtures/operations';
  import { removeItemFromArray } from '$src/utils/utils';
  import { onMount } from 'svelte';
  import Drawflow from './drawflow.svelte';
  import { io, Socket } from 'socket.io-client';
  import { AnForWhat, type AnWorkflowData } from '@anagolay/types';
  import Navbar from './navbar.svelte';
  import { wsConnected } from '$src/stores';
  import Spinner from '$src/components/Spinner.svelte';
  import type { DrawflowNode, NodeToAdd, Segment, SegmentData } from './interfaces';
  import { addedNodes, allNodes, workflow } from './stores';
  import { isNil, last, reject } from 'remeda';
  import OperationNode from './OperationNode.svelte';
  /**
   * This is how we buidl the actual VALUES! i had to change the output of the types to be ES2020
   */
  const groupsAll = Object.entries(AnForWhat);

  const Groups: { id: number; name: string }[] = groupsAll
    .slice(groupsAll.length / 2, groupsAll.length)
    .map((g) => {
      return {
        id: g[1] as number,
        name: g[0],
      };
    });

  let socket: Socket;

  let saveDisabled: boolean = false;

  function sendMessageToWs() {
    console.log(workflowData);
    socket.emit('continueWithWorkflow', workflowData);
  }

  /**
   * Svelte magic, this gets automagically populated when `index.ts` is finished and finds the values 😍
   */
  export let namespace: string;
  /**
   * Websocket to connect to
   */
  export let ws: string;
  export let path: string;

  /**
   * Get this from the @anagolay/types
   */
  let workflowData: AnWorkflowData = {
    name: '',
    description: '',
    creator: '',
    groups: [],
    segments: [],
  };

  // only getting the fixtures
  let opsFixtures: Promise<OperationsFixture[]> = makeOps();

  // add the node to the drawer
  function addNode(data: OperationsFixture) {
    const {
      id: operationId,
      data: { name, input, output, groups, config },
      versions,
    } = data;

    // we are adding the versionID  to the workflow, not operationID
    const id = last(versions);

    if (!$addedNodes.includes(id)) {
      const nodeToAdd: NodeToAdd = {
        id,
        data: [
          name,
          input.length,
          1, // always only one output
          ($addedNodes.length + 1) * 80,
          ($addedNodes.length + 1) * 40,
          'bg-base-content',
          { input, output, groups, config },
          `<div class="container">
            <span class="w-fit text-base-100">${name}</span>
           </div>
          `,
          false,
        ],
      };
      bindedDf.addNode(nodeToAdd);
      addedNodes.update((currentState) => [...currentState, id]);
      allNodes.update((currentState) => [...currentState, nodeToAdd]);

      workflow.addNode(nodeToAdd);

      createWorkflow();
    }
  }
  /**
   * Create a new segment.
   *
   * @privateRemark - This must be done in better way.
   *
   * @param currentNode
   * @param outgoers
   * @param currentSegment
   * @param incomingSegments
   */
  function createNewSegment(currentSegment: SegmentData[], incomingSegments: Segment[]) {
    const segments = incomingSegments;

    if (currentSegment.length > 0) {
      segments.push({
        input: [],
        sequence: [...currentSegment].reverse(),
      });
      // clear out currentSegment, there must be better solution
      currentSegment.splice(0, currentSegment.length);
    }
    return segments;
  }

  function traverseGraph(currentNode: DrawflowNode, currentSegment, segments, traversed: string[] = []) {
    const allNodesDrawflow: Record<string, DrawflowNode> = bindedDf.allNodes().data;

    // get all incomming connections
    // outgoers
    const incomingConnections = Object.keys(currentNode.inputs)
      .map((k) => {
        const input = currentNode.inputs[k];
        return input.connections;
      })
      .flat();

    // While using drawflow we can always know the name of the output. Also we cannot have more than one output, so it will always be `output_1`
    const outgoingConnections = currentNode.outputs['output_1'].connections;

    const isTraversed = traversed.includes(currentNode.id);

    if (!isTraversed) {
      traversed.push(currentNode.id);
      if (outgoingConnections.length > 1) {
        createNewSegment(currentSegment, segments);
      }
      currentSegment.push({
        node: currentNode,
        representation: [currentNode.name, {}],
      });

      if (
        incomingConnections.length === 0 ||
        incomingConnections.length > 1 ||
        currentNode.data.groups.includes('USER')
      ) {
        createNewSegment(currentSegment, segments);
        incomingConnections.map((inputConnection) => {
          const r = bindedDf.getNodeFromId(inputConnection.node);
          traverseGraph(r, currentSegment, segments);
        });
      } else if (incomingConnections.length === 1) {
        const currentNode = bindedDf.getNodeFromId(incomingConnections[0].node);

        traverseGraph(currentNode, currentSegment, segments, traversed);
      }
    }
    console.log({ segments, incomingConnections, outgoingConnections });
  }

  /**
   * Make the workflow object
   */
  function createWorkflow() {
    let segments: Segment[] = [];
    let currentSegment: SegmentData[] = [];

    const allNodesDrawflow: Record<string, DrawflowNode> = bindedDf.allNodes().data;

    const roots = reject(
      Object.keys(allNodesDrawflow).map((key) => {
        const df_Node = allNodesDrawflow[key];
        // While using drawflow we can always know the name of the output. Also we cannot have more than one output, so it will always be `output_1`
        if (df_Node.outputs['output_1'].connections.length === 0) {
          return df_Node;
        }
      }),
      isNil
    );

    console.log('roots', roots);
    roots.map((r) => {
      traverseGraph(r, currentSegment, segments);
      if (currentSegment.length > 0) {
        const incomingConnections = Object.keys(r.inputs)
          .map((k) => {
            const input = r.inputs[k];
            return input.connections;
          })
          .flat()
          .reverse();
        createNewSegment(currentSegment, segments);
      }
    });
    segments = segments.reverse();

    const nodeIdsBySegment = segments.map((segment) => segment.sequence.flatMap((data) => data.node.id));

    segments.forEach((segment) => {
      const firstOpData = segment.sequence[0];
      // in drawflow the inputs are Record<string,any>, need the length, so only way is to get the keys then length of them
      const inputKeys = Object.keys(firstOpData.node.inputs);
      segment.input = Array(Math.max(1, inputKeys.length)).fill(-1);
    });

    const s = segments.map((segment) => {
      return {
        input: segment.input,
        sequence: segment.sequence.map((d: SegmentData) => ({
          version_id: d.node.id,
          config: {},
        })),
      };
    });
    console.log({ segments, s });

    return s;
  }

  /**
   * Wrapper for remove node
   */
  function removeNode(event: CustomEvent<{ id: string }>) {
    const { id } = event.detail;
    addedNodes.set(removeItemFromArray($addedNodes, id));
  }

  /**
   * On the Component mount
   */
  onMount(async () => {
    workflowData.name = namespace;

    socket = io(ws + '/' + namespace, {
      path,
      reconnection: true,
      transports: ['websocket'],
      secure: false,
    });

    socket.on('connect', () => {
      console.debug('connected with id %s and namespace %s', socket.id, namespace);
      wsConnected.set(true);
    });

    socket.on('disconnected', () => {
      socket.disconnect();
      wsConnected.set(false);
    });

    socket.on('connect_error', () => {
      console.error('socket error');
      socket.connect();
    });

    socket.on('continueWithWorkflow', (message) => {
      console.log(message);
    });
  });

  // Bind the drawFlow.svelte to this bariable so we can use it
  let bindedDf: Drawflow;

  /**
   * Opens the Operarion Info modal window
   * @param id
   */
  function showOperationInfo(id: string) {
    console.log('operationid is %s', id);
    console.log('this should open the modal');
  }

  // // here is where you look  for the changes this onEffect
  // $: {
  //   console.log($allNodes);

  //   console.log(workflowData);
  // }
</script>

<div>
  <Navbar />
  <div class=" flex flex-row min-h-screen">
    <aside
      class=" w-64 md:shadow transform -translate-x-full md:translate-x-0 transition-transform duration-150 ease-in bg-base-content"
    >
      <div class="container px-4 my-2">
        <h2 class="text-base-300">Operations:</h2>
        <ul class="flex flex-col w-full">
          {#await opsFixtures}
            <li>
              <Spinner outerBorder="border-primary" />
            </li>
          {:then opsFixtures}
            {#each opsFixtures as op}
              <li>
                <OperationNode {op} {addNode} {showOperationInfo} />
              </li>
            {/each}
          {:catch error}
            <p style="color: red">{error.message}</p>
          {/await}
        </ul>
      </div>
      <div class="h-fit">
        <div class="form-control px-4">
          <div>
            <label class="label" for="workflowName">
              <span class="label-text text-base-300">Name</span>
            </label>
            <input
              type="text"
              name="workflowName"
              bind:value={workflowData.name}
              class="input bg-slate-200 input-bordered w-full max-w-xs text-slate-800 focus:text-slate-100 focus:bg-primary-focus"
            />
          </div>
          <div>
            <label class="label" for="workflowDesc">
              <span class="label-text text-base-300">Description</span>
            </label>
            <input
              type="text"
              name="workflowDesc"
              bind:value={workflowData.description}
              class="input bg-slate-200 input-bordered w-full max-w-xs text-slate-800 focus:text-slate-100  focus:bg-primary-focus"
            />
          </div>
          <div>
            <label class="label" for="groups">
              <span class="label-text text-base-300">Groups</span>
            </label>

            <div class="bg-slate-200 rounded-lg px-2 py-2">
              {#each Groups as group}
                <div class="form-control py-0 px-0">
                  <label class="label cursor-pointer">
                    <span class="label-text text-black">{group.name}</span>
                    <input
                      bind:group={workflowData.groups}
                      type="checkbox"
                      name="groups"
                      class="checkbox outline checkbox-primary"
                      value={group.id}
                    />
                  </label>
                </div>
              {/each}
            </div>
          </div>
        </div>
        <div class="px-4 py-6 btn-group w-full bottom-0">
          <button
            disabled={saveDisabled}
            on:click={sendMessageToWs}
            class="btn w-1/2 btn-primary  disabled:text-slate-500">Save</button
          >
          <button class="btn w-1/2 btn-error">Cancel</button>
        </div>
      </div>
    </aside>

    <main
      class="bg-base-300 h-max flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in"
    >
      <div class=" flex flex-col flex-grow">
        <Drawflow bind:this={bindedDf} on:createWorkflow={createWorkflow} on:removeNode={removeNode} />
      </div>
    </main>
  </div>
</div>
