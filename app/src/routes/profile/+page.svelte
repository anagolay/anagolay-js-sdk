<script lang="ts">
import '@anagolay/types/augment-api';

import { VerificationRequest } from '@anagolay/types/augment-api';
import { isEmpty } from 'ramda';
import { onMount } from 'svelte';
import SvelteSeo from 'svelte-seo';

import { chainConnected, chainStore, pageTitle } from '$src/appStore';
import { polkadotAccountsStore } from '$src/components/polkadot/store';
import CardLoader from '$src/components/profile/channel/CardLoader.svelte';
import ChannelCard from '$src/components/profile/channel/ChannelCard.svelte';

let channels: VerificationRequest[] = [];
let loading: boolean = true;

const title: string = 'My Channels';
pageTitle.set(title);

async function fetchVerifications() {
  const { api } = $chainStore;

  const verifications: VerificationRequest[] = await api.rpc.verification.getRequestsForAccount(
    $polkadotAccountsStore.selectedAccount.address,
    undefined,
    0,
    1000
  );

  if (verifications.length) {
    channels = verifications;
  }
  loading = false;
}

onMount(() => {
  /**
   * this is fucking anti-pattern
   * due to the issue with RPCs and type generation
   * If the Custom Type is used ONLY for the RPC it is not included in the metadata and
   * thus not included in the type generation. Also this doesn't respect serialization and deserialization of the enum values where the RPC requests a value like `desc` the code will force `Desc`  aaaand this will obviously fail.
   *
   * Due to this and many other issues we are forced to maintain 2 sets of RPCs definitions, and guess what, this issue works with the RIGHT ones, the ones that are defined in the `definition.ts`. These don't have the `Pallet` prefix for the custom types.
   *
   * The second set we maintain is with the `Pallet` prefix for the custom types and this DOESN'T WORK WITH THAT!
   *
   * go fucking figure, truly masterpiece of the SDK, truly full of errors
   *
   * this is disabled because Daniel decided to remove the param that was causing the issue and
   * make it default behavior. this is NOT proper way of doing things. why RPC doesn't respect
   * the deserialization for the custom type that is not used anywhere else?????
   *
   * thank you for reading
   */
  // connectToWsWithCorrectRpc($chainStore.connectedTo).then(async (a) => {
  //   await a.isReady;
  //   api = a;
  // });
});

$: $polkadotAccountsStore.selectedAccount &&
  $polkadotAccountsStore.selectedAccount.address &&
  $chainConnected &&
  fetchVerifications();
</script>

<SvelteSeo
  title="{title}"
  description="Companion application for Anagolay network. You can create Workflows, claim domains and much more."
/>

<div class="flex flex-col w-full h-full gap-4">
  {#if loading}
    <CardLoader />
    <CardLoader />
  {:else if !isEmpty(channels)}
    {#each channels as channel}
      <ChannelCard channel="{channel}" />
    {/each}
  {:else}
    <div class="flex justify-center items-center min-h-full">No channels</div>
  {/if}
</div>
