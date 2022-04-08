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
  import { page } from '$app/stores';
  import { AnForWhat, type AnWorkflowData } from '@anagolay/types';

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

  let namespace: string;

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
          'classname-my-own',
          { input, output, versions },
          `<div class="container">
            <span class="w-fit text-white">${name}</span>
           </div>
          `,
          false,
        ],
      };
      bindedDf.addNode(nodeToAdd);
      addedNodes = [...addedNodes, id];
    }
  }

  /**
   * Wrapper for remove node
   */
  function removeNode(event: CustomEvent<{ id: string }>) {
    const { id } = event.detail;
    addedNodes = removeItemFromArray(addedNodes, id);
  }

  onMount(async () => {
    const whereToConnect = $page.url.searchParams.get('ws');
    namespace = $page.url.searchParams.get('ns');
    workflowData.name = namespace;

    const path = '/' + ($page.url.searchParams.get('path') || 'ws');

    socket = io(whereToConnect + '/' + namespace, {
      path,
      reconnection: true,
      transports: ['websocket'],
      secure: false,
    });

    socket.on('connect', () => {
      console.log('connected with id %s and namespace %s', socket.id, namespace);
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

  $: console.log(workflowData);
</script>

<div class="flex flex-row min-h-screen">
  <aside
    class="sidebar w-64 md:shadow transform -translate-x-full md:translate-x-0 transition-transform duration-150 ease-in bg-base-content"
  >
    <div class="sidebar-content px-4 py-6">
      <h2 class="text-white">Operations</h2>
      <ul class="flex flex-col w-full">
        {#await opsFixtures}
          <li>...waiting for fixtures</li>
        {:then opsFixtures}
          {#each opsFixtures as op}
            <li class="my-1">
              <div
                class="flex flex-column w-full justify-between items-center h-10 px-3 rounded-lg text-gray-700 bg-gray-100"
              >
                <button
                  disabled={addedNodes.includes(op.id)}
                  on:click={() => addNode(op)}
                  class="flex flex-row items-center h-10 rounded-lg {addedNodes.includes(op.id)
                    ? 'disabled:opacity-75'
                    : ''}"
                >
                  <button
                    disabled={!addedNodes.includes(op.id)}
                    class="flex items-center text-lg text-green-400 disabled:text-slate-200"
                  >
                    <MaterialIcon classNames="w-8" iconName="checked" />
                  </button>

                  <span>{op.data.name}</span>
                </button>
                <button on:click={() => showOperationInfo(op.id)} class="flex items-center text-lg ">
                  <MaterialIcon classNames="w-8 " iconName="info" />
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
            <span class="label-text text-white">Name</span>
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
            <span class="label-text text-white">Description</span>
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
            <span class="label-text text-white">Groups</span>
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
        <button disabled={saveDisabled} on:click={sendMessageToWs} class="btn w-1/2 btn-primary">Save</button>
        <button class="btn w-1/2 btn-error">Cancel</button>
      </div>
    </div>
  </aside>

  <main class="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
    <div class="main-content flex flex-col flex-grow px-4">
      <div class="flex flex-col flex-grow border-4 border-gray-400 border-dashed bg-white rounded">
        <Drawflow bind:this={bindedDf} on:removeNode={removeNode} />
      </div>
    </div>
  </main>
</div>
