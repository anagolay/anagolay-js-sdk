<script lang="ts">
import { BN } from '@polkadot/util';
import { isNil } from 'ramda';
import { onMount } from 'svelte';

import { fundsAvailable } from '$src/appStore';
import { tokenName } from '$src/config';
import { sendMessage } from '$src/messaging/messaging';
import type { RequestAccountCreateSuri } from '$src/types';
import { formatBalance } from '$src/utils/utils';

import AnagolayCard from './AnagolayCard.svelte';
onMount(() => {
  sendMessage('pri(accounts.getAccountSelected)').then(async (e: RequestAccountCreateSuri) => {
    if (isNil(e)) {
      return;
    }
    const { asString, formatted } = await sendMessage('pri(accounts.getFundsForAccount)', e.address);
    fundsAvailable.set({
      free: formatted,
      freeBn: new BN(asString)
    });
  });
});
</script>

<AnagolayCard class="items-center justify-center w-60">
  <span slot="title" class="text-xl">
    {formatBalance($fundsAvailable.freeBn, {
      withUnit: tokenName,
      withSiFull: true
    })}
  </span>
  <span slot="subtitle" class="text-sm">Funds available</span>
</AnagolayCard>
