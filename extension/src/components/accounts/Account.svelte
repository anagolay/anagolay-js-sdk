<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<script lang="ts">
import { equals, isNil } from 'ramda';
import { Icon } from 'svelte-awesome';
import copyIcon from 'svelte-awesome/icons/copy';
import verticalDotsIcon from 'svelte-awesome/icons/ellipsisV';

import PolkadotIdenticon from '$src/components/polkadotIdenticon/PolkadotIdenticon.svelte';
import { sendMessage } from '$src/messaging/messaging';
import { createAccountStore, selectedAccount } from '$src/routes/accounts/store';
import { copyToClipboard } from '$src/utils/utils';

export let address: string;
export let name: string;

let nameToEdit: string = name;
let editingField = false;

async function handleChange() {
  await sendMessage('pri(accounts.update.single)', {
    address,
    name: nameToEdit
  });
  await createAccountStore.refreshAccounts();
  editingField = !editingField;
}
async function deleteAccount() {
  const confirmed = confirm('Are you sure you want to delete account?');
  if (confirmed) {
    const success = await sendMessage('pri(accounts.delete)', address);
    await sendMessage('pri(accounts.setAccountSelected)', '');
    selectedAccount.set(undefined);
    if (success) {
      await createAccountStore.refreshAccounts();
    }
  }
}
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->

<div class="flex flex-row justify-between items-center bg-base-300 gap-1 p-2 rounded-lg hover:shadow-2xl">
  <div
    class="w-2 h-full inline-block {!isNil($selectedAccount) &&
      equals(address, $selectedAccount.address) &&
      'bg-primary'}"
  >
    &nbsp;
  </div>
  <button class="btn btn-ghost btn-circle" on:click="{() => copyToClipboard(address)}">
    <PolkadotIdenticon address="{address}" />
  </button>
  <div class="flex flex-col gap-1 w-full">
    <div class="flex justify-start tooltip w-full" data-tip="Click to edit">
      <input
        class="input input-ghost focus:outline-none input-sm text-lg p-0 focus:p-2 w-full"
        type="text"
        placeholder="account name"
        readonly="{!editingField}"
        bind:value="{nameToEdit}"
        on:click="{() => {
          editingField = !editingField;
        }}"
        on:change="{handleChange}"
      />
    </div>
    <span class="text-xs">{address}</span>
  </div>
  <div class="flex flex-row gap-2 items-center">
    <button class="btn btn-ghost btn-circle btn-sm" on:click="{() => copyToClipboard(address)}">
      <Icon data="{copyIcon}" />
    </button>
    <div class="dropdown dropdown-left">
      <label tabindex="0" class="btn btn-ghost btn-circle btn-sm m-1">
        <Icon data="{verticalDotsIcon}" />
      </label>
      <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
        <li>
          <button on:click="{deleteAccount}">Delete</button>
        </li>
      </ul>
    </div>
  </div>
</div>
