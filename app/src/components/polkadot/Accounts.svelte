<script lang="ts">
  import { isEmpty } from 'ramda';
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  import { notificationsStore } from '../notifications/store';
  import { polkadotAccountsStore } from './store';
  import CollapseView from './views/CollapseView.svelte';
  import DropdownView from './views/DropdownView.svelte';

  let classNames = '';
  export { classNames as class };

  export let applicationName = 'anagolay.js';

  export let showAs: 'dropdown' | 'collapse' = 'dropdown';

  let accountsLoaded = false;

  onMount(async () => {
    // load accounts only once
    if (isEmpty($polkadotAccountsStore.injectedAccounts)) {
      // import { web3Accounts, web3Enable } from '@polkadot/extension-dapp?client';
      const { web3Accounts, web3Enable } = await import('@polkadot/extension-dapp');

      await web3Enable(applicationName);
      // set to the storage
      const accounts = await web3Accounts();
      $polkadotAccountsStore.injectedAccounts = accounts;
    }

    if (isEmpty($polkadotAccountsStore.injectedAccounts)) {
      notificationsStore.addNew({
        text: `PolkadotJS extension is not loaded. Please enable it or install it.`,
        infoLevel: 'warning',
        autoclose: { close: false },
        showSpinner: true
      });

      console.log(`[PolkadotAccounts]: PolkadotJS extension is not loaded. Please enable it or install it.`);
    } else {
      accountsLoaded = true;
    }
  });
</script>

<div title="Polkadot Accounts" class={classNames}>
  {#if !accountsLoaded}
    <div class="animate-pulse flex-1 bg-base-300 p-4 text-center font-mono">Waiting for the accounts ...</div>
  {/if}
  {#if accountsLoaded}
    {#if showAs === 'dropdown'}
      <div class="w-full" transition:fade={{ delay: 250, duration: 300 }}>
        <DropdownView />
      </div>
    {:else if showAs === 'collapse'}
      <CollapseView />
    {/if}
  {/if}
</div>
