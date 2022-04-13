<script context="module" lang="ts">
  export interface NodeToAdd {
    id: string;
    data: [string, number, number, number, number, string, any, string, string | boolean];
  }
</script>

<script lang="ts">
  import MaterialIcon from '$src/components/MaterialIcon.svelte';
  import { makeOps, type OperationsFixture } from '$src/fixtures/operations';
  import { removeItemFromArray } from '$src/utils/utils';
  import { onMount } from 'svelte';
  import Drawflow from './drawflow.svelte';
  import { io, Socket } from 'socket.io-client';
  import { AnForWhat, type AnWorkflowData } from '@anagolay/types';
  import Navbar from './navbar.svelte';
  import { wsConnected } from '$src/stores';
  import Spinner from '$src/components/Spinner.svelte';

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

  // workaround for the missing deduplication
  let addedNodes: string[] = [];

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
      id,
      data: { name, input, output },
      versions,
    } = data;
    if (!addedNodes.includes(id)) {
      const nodeToAdd: NodeToAdd = {
        id,
        data: [
          name,
          input.length,
          1,
          (addedNodes.length + 1) * 80,
          (addedNodes.length + 1) * 40,
          'bg-base-content',
          { input, output, versions },
          `<div class="container">
            <span class="w-fit text-base-100">${name}</span>
           </div>
          `,
          false,
        ],
      };
      bindedDf.addNode(nodeToAdd);
      addedNodes = [...addedNodes, id];
      makeWorkflow(nodeToAdd);
    }
  }

  function makeWorkflow(newNode: NodeToAdd) {
    console.log('newNode', newNode, bindedDf.allNodes());
  }
  /**
   * Wrapper for remove node
   */
  function removeNode(event: CustomEvent<{ id: string }>) {
    const { id } = event.detail;
    addedNodes = removeItemFromArray(addedNodes, id);
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
    console.log('this shoul open the modal');
  }

  // here is where you look  for the changes this onEffect
  $: console.log(workflowData);
</script>

<div>
  <Navbar />
  <div class="flex flex-row min-h-screen">
    <aside
      class="sidebar w-64 md:shadow transform -translate-x-full md:translate-x-0 transition-transform duration-150 ease-in bg-base-content"
    >
      <div class="px-4 py-6">
        <h2 class="text-base-300">Operations</h2>

        <ul class="flex flex-col w-full">
          {#await opsFixtures}
            <li>
              <Spinner outerBorder="border-primary" />
            </li>
          {:then opsFixtures}
            {#each opsFixtures as op}
              <li class="my-1">
                <div
                  class="flex flex-column w-full justify-between items-center h-10 px-1 rounded-lg text-gray-700 bg-base-content outline-dashed"
                >
                  <button
                    disabled={addedNodes.includes(op.id)}
                    on:click={() => addNode(op)}
                    class="flex flex-row items-center justify-start h-10 rounded-lg w-full {addedNodes.includes(
                      op.id
                    )
                      ? 'disabled:opacity-75'
                      : ''}"
                  >
                    <button
                      disabled={!addedNodes.includes(op.id)}
                      class="py-1 text-lg btn-sm disabled:text-slate-200"
                    >
                      <MaterialIcon classNames="w-4" iconName="checked" />
                    </button>

                    <span class="px-2">{op.data.name}</span>
                  </button>
                  <button on:click={() => showOperationInfo(op.id)} class="flex items-center text-lg ">
                    <MaterialIcon classNames="w-8" iconName="info" />
                  </button>
                </div>
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
        <Drawflow bind:this={bindedDf} on:connectionCreated={console.log} on:removeNode={removeNode} />
      </div>
    </main>
  </div>
</div>
