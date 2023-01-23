<script lang="ts">
import { Icon } from 'svelte-awesome';
import copyIcon from 'svelte-awesome/icons/copy';

import PolkadotIdenticon from '$src/components/polkadotIdenticon/PolkadotIdenticon.svelte';
import { createAccountStore } from '$src/routes/accounts/store';
import { copyToClipboard } from '$src/utils/utils';
</script>

<div class="flex flex-row justify-between items-center bg-base-300 gap-2 p-2 rounded-lg">
  <button
    class="btn btn-ghost btn-circle"
    on:click="{() => copyToClipboard($createAccountStore.address, 'Address copied')}"
  >
    <PolkadotIdenticon class="" address="{$createAccountStore.address}" />
  </button>
  <div class="flex flex-col gap-2 w-full">
    <input
      class="input input-ghost px-2 bg-base-100 text-white input-sm text-lg p-0 focus:p-2 w-full"
      type="text"
      placeholder="Write the account name"
      required
      bind:value="{$createAccountStore.name}"
    />
    <span class="text-sm">{$createAccountStore.address}</span>
  </div>
  <button
    class="btn btn-ghost btn-circle btn-sm"
    on:click="{() => copyToClipboard($createAccountStore.address, 'Address copied')}"
  >
    <Icon data="{copyIcon}" />
  </button>
</div>
