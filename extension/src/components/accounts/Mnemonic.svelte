<script lang="ts">
import { trim } from 'ramda';
import { Icon } from 'svelte-awesome';
import copyIcon from 'svelte-awesome/icons/copy';
import warningIcon from 'svelte-awesome/icons/warning';

import {
  createAccountStore,
  savedSeedAcknowledgement,
  SEED_DEFAULT_LENGTH
} from '$src/routes/accounts/store';
import { copyToClipboard } from '$src/utils/utils';

export let asNew = true;

async function handlePasteSeed(e: ClipboardEvent) {
  // do nothing here
  if (asNew) {
    return;
  }
  const seed = e.clipboardData.getData('text');
  await createAccountStore.new(trim(seed));
}
</script>

<div class="flex flex-col gap-2">
  <span class="uppercase">Generated {SEED_DEFAULT_LENGTH}-word mnemonic seed:</span>
  <textarea
    on:paste="{handlePasteSeed}"
    autocapitalize="off"
    autocomplete="off"
    autocorrect="off"
    spellcheck="false"
    class="textarea w-full bg-base-300 text-accent font-bold"
    readonly="{asNew}"
    required
    rows="2">{$createAccountStore.seed}</textarea
  >
  {#if asNew}
    <button class="btn btn-ghost gap-2" on:click="{() => copyToClipboard($createAccountStore.seed)}">
      <Icon data="{copyIcon}" />
      Copy phrase
    </button>

    <div class="alert alert-warning shadow-lg">
      <div>
        <Icon data="{warningIcon}" scale="{4}" />

        <span>
          DO NOT CLICK OUTSIDE OF THIS POPUP!! Please save this phrase. We suggest using non-browser-based
          password managers. This phrase will be required to restore your account.
        </span>
      </div>
    </div>

    <div class="form-control">
      <label class="cursor-pointer label">
        <span class="label-text">I have copied the seed phrase and saved it</span>
        <input type="checkbox" bind:checked="{$savedSeedAcknowledgement}" class="checkbox checkbox-success" />
      </label>
    </div>
  {/if}
</div>
