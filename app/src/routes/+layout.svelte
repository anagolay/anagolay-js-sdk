<script lang="ts">
import '../sentry';
import '$src/app.css';
import '@anagolay/types/augment-api';

import { VoidFn } from '@polkadot/api/types';
import { forEach } from 'ramda';
import { onDestroy, onMount } from 'svelte';

import { dev } from '$app/environment';
import { bestBlock, chainConnected, chainStore, finalizedBlock, showSidebar } from '$src/appStore';
import Navbar from '$src/components/navigation/Navbar.svelte';
import Sidebar from '$src/components/navigation/Sidebar.svelte';
import Notifications from '$src/components/notifications/Notifications.svelte';

/**
 * the list of unsubscribe functions that need to be called on unmount
 */
let unsubscribes: VoidFn[] = [];

async function setupChainData() {
  const bestBlockUnsub = await $chainStore.api.rpc.chain.subscribeNewHeads((header) => {
    bestBlock.set(parseInt(header.number.toString(), 10));
  });
  unsubscribes.push(bestBlockUnsub);

  const finBlockUnsub = await $chainStore.api.derive.chain.bestNumberFinalized((res) => {
    finalizedBlock.set(res.toNumber());
  });
  unsubscribes.push(finBlockUnsub);
}

onMount(async () => {
  // connect to the chain at the start of the app. the rest
  await chainStore.connect();
});

onDestroy(() => {
  if (!dev) {
    console.log('calling unmount');
    forEach((unsub) => unsub(), unsubscribes);
  }
});

$: {
  if ($chainConnected) {
    setupChainData();
  }
}
</script>

<!-- we want notifications to be first to load! -->
<div class="flex flex-row">
  <Notifications />
  <div class="{$showSidebar ? '' : 'hidden'}">
    <Sidebar />
  </div>

  <div class="w-full flex flex-col overflow-hidden ">
    <Navbar />
    <slot />
  </div>
</div>
