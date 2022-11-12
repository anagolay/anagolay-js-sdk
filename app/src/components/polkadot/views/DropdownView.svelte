<script lang="ts">
  import type { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
  import Identicon, { type IdenticonOptions } from 'identicon.js';
  import { isEmpty, isNil, take, takeLast } from 'ramda';
  import { equals } from 'ramda';
  import { fade } from 'svelte/transition';

  import { notificationsStore } from '../../notifications/store';
  import { polkadotAccountsStore } from '../store';

  let classNames = '';
  export { classNames as class };

  const identiconOptions: IdenticonOptions = {
    foreground: [0, 0, 0, 255], // rgba black
    background: [255, 255, 255, 255], // rgba white
    margin: 0.1, // 20% margin
    size: 500, // 420px square
    format: 'png' // use PNG instead of SVG
  };

  // we will use this to filter the list
  let localAccounts: InjectedAccountWithMeta[] = [];

  let locallySelectedAddress: InjectedAccountWithMeta | undefined;

  // default identicon
  let avatarIconImageBase64String: string = new Identicon(
    'default-text-for-our-identicon',
    identiconOptions
  ).toString();

  /**
   * Truncate the address showing first X and last Y joined with the `...`
   * @param address
   */
  function truncateAddress(address: string): string | boolean {
    if (isNil(address) || isEmpty(address)) {
      return false;
    }
    // take first 7
    const start = take(7, address);

    // and take last 7
    const end = takeLast(7, address);

    return `${start}...${end}`;
  }

  function makeAvatarIcon(data: string): string {
    const identiconImage = new Identicon(data, identiconOptions).toString();
    return identiconImage;
  }

  /**
   * Copy the string to the clipboard
   * #_REWRITE
   * @param address
   */
  async function copyToClipboard(address: string) {
    await navigator.clipboard.writeText(address);
    notificationsStore.addNew({
      text: 'Address copied.'
    });
  }

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
      localAccounts = $polkadotAccountsStore.injectedAccounts;
    } else {
      const filtered = $polkadotAccountsStore.injectedAccounts.filter((a) => {
        return a.meta.name?.includes(v);
      });
      localAccounts = filtered;
    }
  }

  $: {
    if (!isNil($polkadotAccountsStore.selectedAccount) && !isEmpty($polkadotAccountsStore.selectedAccount)) {
      avatarIconImageBase64String = makeAvatarIcon($polkadotAccountsStore.selectedAccount.address);
      locallySelectedAddress = $polkadotAccountsStore.selectedAccount;
    }

    localAccounts = $polkadotAccountsStore.injectedAccounts;
  }
</script>

<!-- <div class="dropdown dropdown-end dropdown-open {classNames}"> -->
<div class="dropdown dropdown-start w-full {classNames}">
  <div class="flex items-center gap-2 w-full">
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <label tabindex="0" class="btn btn-ghost btn-circle avatar">
      <img class="rounded-full" alt="Identicon" src="data:image/png;base64,{avatarIconImageBase64String}" />
    </label>
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <label tabindex="0" class="cursor-pointer">
      {#if locallySelectedAddress}
        <p class="truncate">{locallySelectedAddress.meta.name}</p>
      {:else}
        Select the account.
      {/if}
    </label>
  </div>

  <div class="flex flex-col dropdown-content bg-base-300 p-4 shadow-lg drop-shadow-2xl w-96 rounded-lg">
    <!-- svelte-ignore a11y-autofocus -->
    <input
      type="search"
      placeholder="Filter accounts..."
      class="input w-full"
      on:input={(e) => makeSearch(e)}
    />
    <div class="divider" />

    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <ul tabindex="0" class="menu menu-compact gap-2">
      {#if !isEmpty(localAccounts)}
        {#each localAccounts as account}
          <li class="shadow bg-base-100">
            <div
              transition:fade={{ delay: 250, duration: 300 }}
              class="flex flex-row {!isNil(locallySelectedAddress) &&
                equals(account.address, locallySelectedAddress.address) &&
                'active'}"
            >
              <button
                class="btn btn-ghost btn-circle avatar"
                on:click={() => copyToClipboard(account.address)}
              >
                <img
                  class="rounded-full"
                  alt="Identicon"
                  src="data:image/png;base64,{makeAvatarIcon(account.address)}"
                />
              </button>
              <button
                class="flex flex-col justify-start items-start w-full"
                on:click={() => {
                  polkadotAccountsStore.setSelectedAccount(account);
                }}
              >
                <span class="text-lg">{account.meta.name}</span>
                <span class="text-2xs">{truncateAddress(account.address)}</span>
              </button>
            </div>
          </li>
        {/each}
      {/if}
    </ul>
  </div>
</div>
