<script lang="ts">
  import MaterialIcon from '$src/components/MaterialIcon.svelte';
  import type { OperationsFixture } from '$src/fixtures/operations';
  import { last } from 'remeda';
  import { is_empty } from 'svelte/internal';
  import { addedNodes, workflow } from './stores';
  /**
   * Operation from the chain
   */
  export let op: OperationsFixture;

  /**
   * Add Node to the Drawflow
   */
  export let addNode: (op: OperationsFixture) => void;

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
    workflow.setConfig({
      nodeId: last(op.versions),
      configKey: key,
      configValue: value,
    });
  }
</script>

<div class="flex flex-col w-full rounded-md bg-base-content my-1">
  <div class="flex flex-row bg-base-200 rounded-t-md p-2">
    <button
      disabled={$addedNodes.includes(last(op.versions))}
      on:click={() => addNode(op)}
      class=" flex flex-row items-center justify-start h-10 rounded-md w-full {$addedNodes.includes(
        last(op.versions)
      )
        ? 'text-success'
        : 'text-primary-content'}"
    >
      <span class="px-2">{op.data.name}</span>
    </button>
    <button on:click={() => showOperationInfo(op.id)} class="flex items-center text-lg">
      <MaterialIcon classNames="text-slate-500" iconName="info" />
    </button>
  </div>
  {#if !is_empty(op.data.config)}
    <div class="my-1">
      {#each Object.keys(op.data.config) as key}
        <ul class="menu bg-base-100 ">
          <span class="text-sm p-1">{key.toUpperCase()}</span>

          {#each op.data.config[key] as item}
            <li>
              <label class="label cursor-pointer">
                <span class="text-sm">{item}</span>
                <input
                  disabled={!$addedNodes.includes(last(op.versions))}
                  on:click={() => selectConfig(key, item)}
                  type="radio"
                  name={key}
                  value={item}
                  class="radio radio-primary"
                />
              </label>
            </li>
          {/each}
        </ul>
      {/each}
    </div>
  {/if}
</div>
