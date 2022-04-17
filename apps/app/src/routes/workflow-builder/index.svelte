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
  import type { NodeToAdd, Segment, SegmentData } from './interfaces';
  import { addedNodesIds, workflowGraph, workflowManifest } from './stores';
  import { last } from 'remeda';
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

  let saveDisabled: boolean = true;

  function sendMessageToWs() {
    console.log($workflowManifest);
    socket.emit('continueWithWorkflow', workflowManifest);
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

  // only getting the fixtures
  let opsFixtures: Promise<OperationsFixture[]> = makeOps();

  // add the node to the drawer
  function addNode(data: OperationsFixture) {
    bindedDf.addNode(data);
  }

  /**
   * On the Component mount
   */
  onMount(async () => {
    $workflowManifest.name = namespace;

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
    console.log('operation version ID is %s', id);
    console.log('this should open the modal');
  }

  $: console.log('addedNodesIds', $addedNodesIds);
  $: console.log('workflowGraph', $workflowGraph);
  $: console.log('workflowManifest', $workflowManifest);
</script>

<div>
  <Navbar />
  <button
    class="btn btn-warning"
    on:click={() => {
      addedNodesIds.set([]);
      workflowGraph.reset();
      bindedDf.reset();
    }}>RESET STORES</button
  >
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
              bind:value={$workflowManifest.name}
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
              bind:value={$workflowManifest.description}
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
                      bind:group={$workflowManifest.groups}
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
        <Drawflow bind:this={bindedDf} />
      </div>
    </main>
  </div>
</div>
