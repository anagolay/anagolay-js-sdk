<script lang="ts">
import { onMount } from 'svelte';

import { goto } from '$app/navigation';
import AccountPassword from '$src/components/accounts/AccountPassword.svelte';
import Address from '$src/components/accounts/Address.svelte';
import Mnemonic from '$src/components/accounts/Mnemonic.svelte';
import { sendMessage } from '$src/messaging/messaging';

import { createAccountStore, passwordsMatch, savedSeedAcknowledgement, selectedAccount } from '../store';

let savingAccount = false;

async function saveTheAccount() {
  savingAccount = true;

  await sendMessage('pri(accounts.create.suri)', $createAccountStore);
  await sendMessage('pri(accounts.setAccountSelected)', $createAccountStore.address);
  selectedAccount.set($createAccountStore);
  createAccountStore.refreshAccounts();
  createAccountStore.reset();

  savingAccount = false;
  goto('/');
}

onMount(() => {
  createAccountStore.new().then();
});
</script>

<div class="w-full flex flex-col gap-4 mb-5">
  <Address />
  <Mnemonic />
  {#if $savedSeedAcknowledgement}
    <div class="divider">Now create a password for this account</div>
    <AccountPassword />
  {/if}
  <button
    class="btn btn-primary w-full {savingAccount && 'loading'}"
    on:click="{saveTheAccount}"
    disabled="{!$passwordsMatch || !$savedSeedAcknowledgement}">Save account</button
  >
</div>
