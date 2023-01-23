<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<script lang="ts">
import { BN } from '@polkadot/util';
import { isEmpty, isNil } from 'ramda';
import { equals } from 'ramda';
import { onMount } from 'svelte';
import { fade } from 'svelte/transition';

import { fundsAvailable } from '$src/appStore';
import { sendMessage } from '$src/messaging/messaging';
import { accountsStore, selectedAccount } from '$src/routes/accounts/store';
import type { RequestAccountCreateSuri } from '$src/types';

import PolkadotIdenticon from '../polkadotIdenticon/PolkadotIdenticon.svelte';

// this is used for the search so we can filter out the accounts based on the name
let accounts: RequestAccountCreateSuri[] = [];

onMount(() => {
  sendMessage('pri(accounts.getAccountSelected)').then(async (e: RequestAccountCreateSuri) => {
    if (isNil(e)) {
      return;
    }
    selectedAccount.set(e);
    const { asString, formatted } = await sendMessage('pri(accounts.getFundsForAccount)', e.address);
    fundsAvailable.set({
      free: formatted,
      freeBn: new BN(asString)
    });
  });
});

/**
 * basic search function
 * @param e
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function makeSearch(e: any) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const v: string = e.target.value;
  if (isEmpty(v)) {
    // restore
    accounts = $accountsStore;
  } else {
    const filtered = $accountsStore.filter((a) => {
      return a.name?.includes(v);
    });

    accounts = filtered;
  }
}

async function handleAccountSelectClick(account: RequestAccountCreateSuri) {
  const activeElement = document.activeElement as HTMLElement;

  selectedAccount.set(account);
  const success = await sendMessage('pri(accounts.setAccountSelected)', account.address);

  if (success) {
    const { asString, formatted } = await sendMessage('pri(accounts.getFundsForAccount)', account.address);

    fundsAvailable.set({
      free: formatted,
      freeBn: new BN(asString)
    });

    setTimeout(() => {
      // there MUST be a better way to handle this
      // seems not https://github.com/saadeghi/daisyui/issues/1195#issuecomment-1263906801
      activeElement.blur();
    }, 100);
  }
}

$: accounts = $accountsStore;
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->

<div class="dropdown dropdown-end">
  <div class="flex items-center gap-2 w-full">
    <label tabindex="0" class="cursor-pointer">
      {#if $selectedAccount}
        <button class="btn btn-circle avatar" title="Select the account">
          <PolkadotIdenticon address="{$selectedAccount.address}" />
        </button>
      {:else}
        <!-- we don't have the account show the question mark -->
        <button class="btn btn-circle avatar animate-pulse">
          <span>?</span>
        </button>
      {/if}
    </label>
  </div>

  <div class="flex flex-col dropdown-content bg-base-300 p-4 shadow-lg drop-shadow-2xl w-96 rounded-lg">
    <!-- svelte-ignore a11y-autofocus -->
    <input
      type="search"
      placeholder="Filter accounts..."
      class="input w-full"
      on:input="{(e) => makeSearch(e)}"
    />
    <div class="divider">Please select the account</div>

    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <ul tabindex="0" class="menu menu-compact gap-2">
      {#if !isEmpty(accounts)}
        {#each accounts as account}
          <li class="shadow bg-base-100">
            <div
              transition:fade="{{ delay: 250, duration: 300 }}"
              class="flex flex-row {!isNil($selectedAccount) &&
                equals(account.address, $selectedAccount.address) &&
                'active'}"
            >
              <button
                class="flex flex-col justify-start items-start w-full"
                on:click="{() => handleAccountSelectClick(account)}"
              >
                <span class="text-lg">{account.name}</span>
              </button>
            </div>
          </li>
        {/each}
      {/if}
    </ul>
  </div>
</div>
