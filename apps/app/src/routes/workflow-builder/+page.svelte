<script context="module">
  export const prerender = true;
</script>

<script script lang="ts">
  import { page } from '$app/stores';

  import { onMount } from 'svelte';
  import Drawflow from './drawflow.svelte';
  import { io, Socket } from 'socket.io-client';
  import { AnForWhat, type AnOperation, type AnOperationVersion } from '@anagolay/types';
  import Navbar from './navbar.svelte';
  import { wsConnected } from '$src/stores';
  import { workflow } from './stores';
  import OperationNode from './OperationNode.svelte';
  import SkeletonLoader from '$src/components/SkeletonLoader.svelte';
  import { alerts } from '$src/components/notifications/stores';
  import { connectToApi, retrieveOperations, type OperationWithVersions } from '$src/api';
  import { ApiPromise } from '@polkadot/api';
  import { serializeThenParse } from '$src/utils/json';
  import { isEmpty } from 'ramda';
  import { getHashValue } from '$src/utils/url';
  import slug from 'slug';

  /**
   * A value which we will sluggify and then add to the store value `$workflow.manifestData.name`.
   * This acts as a package name, so choose wisely
   */
  let workflowName: string = '';

  /**
   * This is how we build the actual VALUES! i had to change the output of the types to be ES2020
   */
  const groupsAll = Object.entries(AnForWhat);

  const Groups: { id: number; name: string }[] = groupsAll
    // check the console.log(groupsAll) for the reason why slice and divide by 2
    .slice(groupsAll.length / 2, groupsAll.length)
    .map((g) => {
      return {
        id: g[1] as number,
        name: g[0],
      };
    });

  let socket: Socket;

  let saveDisabled: boolean = true;

  let chain: ApiPromise;

  /**
   * Send the Manifest to WS.
   *
   * @remarks
   * The commented code lines are left like this intentionally.
   */
  function sendMessageToWs() {
    saveDisabled = true;
    alerts.add('Workflow data sent to WS, please check the CLI.', 'success', false);

    // The serialization of the Map is not natively  supported. When we serialize we use the replacer and wnen parse we use the reviver

    const workflowBuild = serializeThenParse($workflow);

    socket.emit('continueWithWorkflow', workflowBuild);

    socket.disconnect();
  }

  function cancelTheCreation() {
    alerts.add('Workflow canceled', 'warning');
    socket.emit('cancelWorkflowBuilding', {});
    socket.disconnect();
  }

  /**
   * Namespace to connect to. This is the shared namespace between this app and CLI
   */
  let namespace: string = getHashValue($page.url.hash, 'ns');

  /**
   * Websocket server address without the client path.
   */
  let ws: string = getHashValue($page.url.hash, 'ws', 'wss://ws.anagolay.io');

  /**
   * This is the path where to get the socket.io client library
   * https://socket.io/docs/v4/client-options/#path
   */
  let path: string = '/' + getHashValue($page.url.hash, 'path', 'ws');

  /**
   * What is the Anagolay Chain ws url. Used for getting the operations
   */
  let anagolay_chain_ws: string = getHashValue(
    $page.url.hash,
    'anagolay_chain_ws',
    'wss://idiyanale-1.bootnode.dev.anagolay.io'
  );

  // Operations with their respective versions from the chain
  let opvs: Promise<OperationWithVersions[]> = new Promise<OperationWithVersions[]>((res, rej) => {});

  // add the node to the drawer
  function addNode(op: AnOperation, versions: AnOperationVersion[]) {
    bindedDf.addNode(op, versions);
  }

  $: console.debug({ namespace, anagolay_chain_ws, ws, path });

  /**
   * On the Component mount
   */
  onMount(async () => {
    chain = await connectToApi(anagolay_chain_ws);

    // initial name is the namespace to connect to
    workflowName = namespace;

    socket = io(ws + '/' + namespace, {
      path,
      reconnection: true,
      transports: ['websocket'],
      secure: false,
    });

    opvs = retrieveOperations(chain);

    socket.on('connect', () => {
      console.debug('WS:: connected with id %s and namespace %s', socket.id, namespace);
      wsConnected.set(true);
    });

    socket.on('disconnect', () => {
      wsConnected.set(false);
    });

    socket.on('connect_error', () => {
      console.error('socket error');
      socket.connect();
    });
  });

  // Bind the drawFlow.svelte to this bariable so we can use it
  let bindedDf: Drawflow;

  /**
   * Opens the Operarion Info modal window
   * @param id
   */
  function showOperationInfo(id: string) {
    console.log('operation version ID is %s', id);
    console.log('this should open the modal');
  }

  // make check when wen can enable save button
  $: {
    const { segments, groups, name, description } = $workflow.manifestData;
    saveDisabled = true;
    if (groups.length > 0 && name.length > 7 && description.length > 7 && segments.length > 0) {
      const heads = segments.filter((s) => s.inputs.every((i) => i == -1));
      const firstSegment = segments[0];
      if (heads.length == 1 && firstSegment.inputs.includes(-1) && firstSegment.sequence.length > 0) {
        saveDisabled = false;
      }
    }
  }

  /**
   * Listen for the changes and then slug the name
   */
  $: $workflow.manifestData.name = slug(workflowName, '_');
</script>

<svelte:head>
  <title>Workflow builder</title>
</svelte:head>

<div>
  <Navbar />

  <div class="flex flex-row min-h-screen ">
    <aside
      class="w-64 lg:shadow transform -translate-x-full md:translate-x-0 transition-transform duration-150 ease-in bg-base-content"
    >
      <div class="px-4 my-2 min-h-12">
        <h2 class="text-base-300">Operations:</h2>
        <ul class="flex flex-col w-full">
          {#await opvs}
            <li>
              <SkeletonLoader />
            </li>
          {:then opvs}
            {#if isEmpty(opvs)}
              <span class="label-text text-base-300">Nothing found. Please publish few Operations.</span>
            {/if}
            {#each opvs as opv}
              <li>
                <OperationNode {opv} {addNode} {showOperationInfo} />
              </li>
            {/each}
          {:catch error}
            <p style="color: red">${error.message}</p>
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
              bind:value={workflowName}
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
              bind:value={$workflow.manifestData.description}
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
                      bind:group={$workflow.manifestData.groups}
                      type="checkbox"
                      name="groups"
                      class="checkbox outline checkbox-primary"
                      value={group.name}
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
          <button on:click={cancelTheCreation} class="btn w-1/2 btn-error">Cancel</button>
        </div>
      </div>
    </aside>

    <main
      class="flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in h-auto  bg-gradient-to-b from-blue-500 to-green-500"
    >
      <Drawflow bind:this={bindedDf} />
    </main>
  </div>
</div>
<!-- 
<style>
  .dim-screen {
    position: fixed;
    padding: 0;
    margin: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.5);
    z-index: 1000;
    backdrop-filter: blur(5px);
  }
</style> -->
