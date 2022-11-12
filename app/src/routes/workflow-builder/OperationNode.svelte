<script context="module">
  export const prerender = false;
</script>

<script lang="ts">
  import { IOperationWithVersions } from '@anagolay/api';
  import type { AnOperation, AnOperationVersion } from '@anagolay/types';
  import { isEmpty } from 'ramda';
  import { last } from 'remeda';

  import MaterialIcon from '$src/components/base/MaterialIcon.svelte';

  import { addedNodesIds, workflow, workflowGraph } from './stores';
  /**
   * Operation and versions from the chain
   */
  export let opv: IOperationWithVersions;

  /**
   * Add Node to the Drawflow
   */
  export let addNode: (op: AnOperation, versions: AnOperationVersion[]) => void;

  /**
   * Show Oepration info Prop
   */
  export let showOperationInfo: (id: string) => void;

  /**
   * Set the config for the node. This method sets the config to the Store
   * @param key
   * @param value
   */
  function selectConfig(key: string, value: string) {
    workflowGraph.setConfigToNode({
      nodeId: last(opv.versions).id,
      configKey: key,
      configValue: value
    });

    workflow.generate();
  }

  let roundedClassName: string = 'rounded-md';
  $: isEmpty(opv.operation.data.config) || (roundedClassName = 'rounded-t-md');
</script>

<div class="flex flex-col w-full rounded-md bg-base-content my-1">
  <div class="flex flex-row bg-base-200 p-2 {roundedClassName}">
    <button
      disabled={$addedNodesIds.includes(last(opv.versions).id)}
      on:click={() => addNode(opv.operation, opv.versions)}
      class=" flex flex-row items-center justify-start h-10 rounded-md w-full {$addedNodesIds.includes(
        last(opv.versions).id
      )
        ? 'text-success'
        : 'text-primary-content'}"
    >
      <span class="px-2">{opv.operation.data.name}</span>
    </button>
    <button on:click={() => showOperationInfo(opv.operation.id)} class="flex items-center text-lg">
      <MaterialIcon class="text-slate-500" iconName="info" />
    </button>
  </div>
  {#if !isEmpty(opv.operation.data.config)}
    <div class="bg-base-content">
      <!-- https://svelte.dev/repl/d9da6330755049dab0aa2a0dcfa2d549?version=3.23.2 -->
      {#each Object.entries(opv.operation.data.config) as [key, values]}
        <ul class="menu bg-base-100 rounded-b-md">
          <span class="text-sm m-3">{key.toUpperCase()}</span>
          {#each values as item}
            <li>
              <label class="label cursor-pointer">
                <span class="text-sm">{item}</span>
                <input
                  disabled={!$addedNodesIds.includes(last(opv.versions).id)}
                  on:click={() => selectConfig(key, item)}
                  type="radio"
                  name={key}
                  value={item}
                  class="radio radio-primary outline-dashed"
                />
              </label>
            </li>
          {/each}
        </ul>
      {/each}
    </div>
  {/if}
</div>
