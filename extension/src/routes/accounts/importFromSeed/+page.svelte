<script lang="ts">
import { BN } from '@polkadot/util';
import { onMount } from 'svelte';

import { goto } from '$app/navigation';
import { fundsAvailable } from '$src/appStore';
import AccountPassword from '$src/components/accounts/AccountPassword.svelte';
import Address from '$src/components/accounts/Address.svelte';
import Mnemonic from '$src/components/accounts/Mnemonic.svelte';
import { sendMessage } from '$src/messaging/messaging';

import { createAccountStore, passwordsMatch, selectedAccount } from '../store';

let savingAccount = false;

function saveTheAccount() {
  savingAccount = true;
  sendMessage('pri(accounts.create.suri)', $createAccountStore)
    .then(async () => {
      savingAccount = false;
      await sendMessage('pri(accounts.setAccountSelected)', $createAccountStore.address);

      const { asString, formatted } = await sendMessage(
        'pri(accounts.getFundsForAccount)',
        $createAccountStore.address
      );

      fundsAvailable.set({
        free: formatted,
        freeBn: new BN(asString)
      });

      selectedAccount.set($createAccountStore);

      createAccountStore.refreshAccounts();
      createAccountStore.reset();

      goto('/');
    })
    .catch((error) => {
      console.log('err', error);
    });
}

onMount(() => {
  // we don't want garbage from the create account
  createAccountStore.reset();
});
</script>

<div class="w-full flex flex-col gap-4 mb-2" on:submit|preventDefault="{saveTheAccount}">
  <Address />
  <Mnemonic asNew="{false}" />
  <AccountPassword />
  <button
    class="btn btn-primary w-full {savingAccount && 'loading'}"
    on:click="{saveTheAccount}"
    disabled="{!$createAccountStore.seed || !$createAccountStore.name || !$passwordsMatch}"
    >Save account</button
  >
</div>
