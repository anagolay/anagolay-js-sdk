<script context="module">
export const csr = false;
export const prerender = true;
import '../sentry';
</script>

<script lang="ts">
import '$src/app.css';
import '@anagolay/types/augment-api';
import Notifications from '$src/components/notifications/Notifications.svelte';
import Sidebar from '$src/components/navigation/Sidebar.svelte';
import Navbar from '$src/components/navigation/Navbar.svelte';
import { showSidebar, chainStore, chainConnected, bestBlock, finalizedBlock } from '$src/appStore';
import { onMount } from 'svelte';
import { dev } from '$app/environment';
import { forEach } from 'ramda';

/**
 * the list of unsubscribe functions that need to be called on unmount
 */
let unsubscribes: any[] = [];

async function setupChainData() {
  const { api } = $chainStore;
  console.groupCollapsed('setupChainData');
  console.log('Chain constants', api.consts);
  console.log('registry', api.registry);

  const bestBlockUnsub = await $chainStore.api.rpc.chain.subscribeNewHeads((header) => {
    bestBlock.set(parseInt(header.number.toString(), 10));
  });
  unsubscribes.push(bestBlockUnsub);

  const finBlockUnsub = await $chainStore.api.derive.chain.bestNumberFinalized((res) => {
    finalizedBlock.set(res.toNumber());
  });
  unsubscribes.push(finBlockUnsub);
  console.groupEnd();
}

onMount(async () => {
  // connect to the chain at the start of the app. the rest
  await chainStore.connect();
  return () => {
    if (!dev) {
      console.log('calling unmount');
      forEach((u) => u(), unsubscribes);
    }
  };
});

$: {
  if ($chainConnected) {
    setupChainData();
  }
}
</script>

<!-- we want notifications to be first to load! -->
<div class="flex flex-row" data-sveltekit-prefetch>
  <Notifications />
  <div class="{$showSidebar ? '' : 'hidden'}">
    <Sidebar />
  </div>

  <div class="w-full">
    <Navbar />

    <!-- here be content -->
    <slot />
    <!-- here be content -->
  </div>
</div>
