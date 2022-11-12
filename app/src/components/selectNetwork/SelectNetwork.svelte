<script lang="ts">
  import { equals, isNil } from 'ramda';

  import { chainStore, connectedChainName, connectingToChain, localStorageConnectToKey } from '$src/appStore';
  import { isValidUrl } from '$src/utils/utils';

  import MaterialIcon from '../base/MaterialIcon.svelte';

  let classNames: string = '';
  export { classNames as class };

  let customChain: string = 'ws://localhost:9944';

  let urlValid: boolean = false;

  $: customChain && (urlValid = isValidUrl(customChain));
</script>

<div class="dropdown {classNames}">
  <div class="w-full md:w-96 flex items-center gap-2">
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <label tabindex="0" class="btn-group">
      <span class="btn btn-accent btn-sm ">{$connectedChainName}</span>
      <span class="btn btn-sm"
        ><MaterialIcon class={$connectingToChain ? 'animate-spin' : ''} iconName="cached" /></span
      >
    </label>
  </div>

  <div class="bg-base-200 mt-3 p-2 shadow-lg drop-shadow-lg dropdown-content w-full">
    <div class="form-control mb-4 w-full">
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label class="input-group">
        <input
          type="text"
          bind:value={customChain}
          placeholder="ws://localhost:9944"
          class="input input-bordered w-full"
        />
        <button
          class="btn btn-primary"
          disabled={!urlValid}
          on:click={async () => {
            chainStore.addCustomChain(customChain);
            // we reload the page because it doesn't work with reconnect. the api just doesn't want to backout
            window.location.reload();
          }}>Switch</button
        >
      </label>
    </div>
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <ul tabindex="0" class="menu menu-compact gap-2">
      {#each $chainStore.chainList as network}
        <li class="shadow">
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <div
            class="flex flex-row {!isNil($chainStore.connectedTo) &&
              equals(network, $chainStore.connectedTo) &&
              'active'}"
            on:click={() => {
              window.localStorage.setItem(localStorageConnectToKey, network);
              // chainStore.reconnect(network);
              window.location.reload();
            }}
          >
            <span class="m-2 flex flex-col justify-start items-start">
              <span class="text-md">{network}</span>
            </span>
          </div>
        </li>
      {/each}
    </ul>
  </div>
</div>
