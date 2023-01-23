<script lang="ts">
import '@anagolay/types/augment-api';

import type { UnsubscribePromise } from '@polkadot/api/types';
import { onMount } from 'svelte';

import { bestBlock, chainConnected, chainStore, connectedChainName } from '$src/appStore';
import MaterialIcon from '$src/components/base/MaterialIcon.svelte';

import Accordion from '../base/Accordion.svelte';

let unsub: UnsubscribePromise;

let specName: string = '';
let specVersion: string = '100';
let implVersion: number = 0;

let addressPrefix: string = '42';
let decimals: string = '12';
let unit: string = 'IDI';

async function handleChainUpdate() {
  const { api } = $chainStore;
  unsub = api.rpc.state.subscribeRuntimeVersion((r) => {
    unit = r.registry.chainTokens.toString();
    addressPrefix = r.registry.chainSS58.toString();
    decimals = r.registry.chainDecimals.toString();
    specName = r.specName.toString();
    specVersion = r.specVersion.toString();
    implVersion = r.implVersion.toNumber();
  });
}

let badgeStatusClass: string = 'animate-pulse badge-info';

onMount(() => {
  return unsub;
});

$: {
  if ($chainConnected) {
    badgeStatusClass = 'badge-success';
    handleChainUpdate();
  }
}
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<Accordion>
  <svelte:fragment slot="title">
    <div class="flex items-center gap-2 networkInfo-checked">
      <div class="badge {badgeStatusClass}"></div>
      <div class="font-medium text">{$connectedChainName} #{$bestBlock}</div>
    </div>
  </svelte:fragment>
  <svelte:fragment slot="content">
    <div class="flex flex-col">
      <div class="flex flex-col text-right">
        <div class="flex flex-row justify-between items-center p-1">
          <span>Chain:</span>
          <span class="text-sm">{$connectedChainName}</span>
        </div>
        <div class="flex flex-row justify-between items-center p-1">
          <span>Specs:</span>
          <span class="text-sm">{specName}/v{implVersion}/{specVersion}</span>
        </div>
        <div class="flex flex-row justify-between items-center p-1">
          <span>Unit:</span>
          <span class="text-sm">{unit}</span>
        </div>
        <div class="flex flex-row justify-between items-center p-1">
          <span>Address Prefix:</span>
          <span class="text-sm">{addressPrefix}</span>
        </div>
        <div class="flex flex-row justify-between items-center p-1">
          <span>Decimals:</span>
          <span class="text-sm">{decimals}</span>
        </div>
        <div class="flex flex-row justify-between items-center p-1">
          <span>Check on PolkadotJS:</span>
          <!-- svelte-ignore security-anchor-rel-noreferrer -->
          <a href="{chainStore.makePolkadotJsAppUrl().toString()}" target="_blank" class="text-sm"
            ><MaterialIcon iconName="link" /></a
          >
        </div>
      </div>
    </div>
  </svelte:fragment>
</Accordion>
