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

  let namespace: string;

  // workaround for the missing deduplication
  let addedNodes: string[] = [];

  // workaround for the missing deduplication
  let connectedNodes: number = 0;

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
    console.log('removeNode', id);

    addedNodes = removeItemFromArray(addedNodes, id);

    // bindedDf.removeNode(id);
  }

  onMount(() => {
    const whereToConnect = $page.url.searchParams.get('ws');
    namespace = $page.url.searchParams.get('ns');
    const socket: Socket = io(whereToConnect + '/' + namespace, {
      path: '/ws',
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
  });

  // Bind the drawFlow.svelte to this bariable so we can use it
  let bindedDf: Drawflow;

  let noticeText: string = `
  <span>Right click selects node for deletion</span>
  `;
</script>

<div class="flex flex-row min-h-screen bg-gray-100 text-gray-800">
  <aside
    class="sidebar w-64 md:shadow transform -translate-x-full md:translate-x-0 transition-transform duration-150 ease-in bg-indigo-500"
  >
    <div class="sidebar-content px-4 py-6">
      <ul class="flex flex-col w-full">
        {#await opsFixtures}
          <li>...waiting for fixtures</li>
        {:then opsFixtures}
          {#each opsFixtures as op}
            <li class="my-1">
              <span class="flex flex-row items-center h-10 px-3 rounded-lg text-gray-700 bg-gray-100">
                <button
                  disabled={addedNodes.includes(op.id)}
                  on:click={() => addNode(op)}
                  class="flex flex-row items-center h-10 rounded-lg {addedNodes.includes(op.id)
                    ? 'disabled:opacity-75'
                    : ''}"
                >
                  <span class="flex items-center text-lg text-green-400">
                    <MaterialIcon classNames="w-8" iconName={addedNodes.includes(op.id) ? 'checked' : ''} />
                  </span>

                  <span>{op.data.name}</span>
                </button>
              </span>
            </li>
          {/each}
        {:catch error}
          <p style="color: red">{error.message}</p>
        {/await}
      </ul>
    </div>
    <div class="absolute bottom-0 my-10">
      <span
        class="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors duration-200 flex items-center py-2 px-8"
      >
        <svg
          width="20"
          fill="currentColor"
          height="20"
          class="h-5 w-5"
          viewBox="0 0 1792 1792"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1088 1256v240q0 16-12 28t-28 12h-240q-16 0-28-12t-12-28v-240q0-16 12-28t28-12h240q16 0 28 12t12 28zm316-600q0 54-15.5 101t-35 76.5-55 59.5-57.5 43.5-61 35.5q-41 23-68.5 65t-27.5 67q0 17-12 32.5t-28 15.5h-240q-15 0-25.5-18.5t-10.5-37.5v-45q0-83 65-156.5t143-108.5q59-27 84-56t25-76q0-42-46.5-74t-107.5-32q-65 0-108 29-35 25-107 115-13 16-31 16-12 0-25-8l-164-125q-13-10-15.5-25t5.5-28q160-266 464-266 80 0 161 31t146 83 106 127.5 41 158.5z"
          />
        </svg>
        <span class="mx-4 font-medium"> Support </span>
      </span>
    </div>
  </aside>

  <main class="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
    <div class="main-content flex flex-col flex-grow p-4">
      <div class="col-auto">
        <button class="btn btn-primary btn-outline">Save The Workflow</button>
        <button class="btn btn-warning">Cancel The Workflow</button>
      </div>

      <div class="flex flex-col flex-grow border-4 border-gray-400 border-dashed bg-white rounded mt-4">
        <Drawflow bind:this={bindedDf} on:removeNode={removeNode} />
      </div>
    </div>
  </main>
</div>

<!-- <style>
  .custom100vh {
    height: 100vh;
  }
</style> -->
