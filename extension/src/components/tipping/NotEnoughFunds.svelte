<script lang="ts">
import { Icon } from 'svelte-awesome';
import copyIcon from 'svelte-awesome/icons/copy';
import externalLinkIcon from 'svelte-awesome/icons/externalLink';

import { domainVerificationStore } from '$src/appStore';
import { selectedAccount } from '$src/routes/accounts/store';
import { copyToClipboard } from '$src/utils/utils';

let message: string;

$: {
  if ($selectedAccount && $domainVerificationStore) {
    message = `Hi there, I would like to send a tip to ${$domainVerificationStore.domain[0]}. Can you send me few IDI? Address is ${$selectedAccount.address}`;
  }
}
</script>

<div class="hero h-full">
  <div class="hero-content text-center">
    <div class="max-w-md">
      <h1 class="text-xl font-bold">Not enough funds to tip this creator.</h1>
      <p class="py-6">
        Choose another account or tag us on <a
          href="https://mastodon.social/@anagolay"
          target="_blank"
          rel="noopener noreferrer"
          class="link link-secondary"
        >
          <Icon data="{externalLinkIcon}" />
          mastodon
        </a>
        or on
        <a
          href="https://twitter.com/AnagolayNet"
          target="_blank"
          rel="noopener noreferrer"
          class="link link-secondary"
        >
          <Icon data="{externalLinkIcon}" />
          twitter
        </a>
        to get few IDI and don't forget to follow 😉.
      </p>

      <div class="flex flex-col gap-4">
        <div class="indicator w-fit">
          <!-- <span class="indicator-item badge badge-primary">{message.length} characters</span>  -->
          <div class="place-items-center bg-slate-500 text-white p-4 rounded-lg">
            {message}
          </div>
        </div>

        <button
          class="btn btn-ghost btn-outline btn-sm w-full"
          on:click="{() => copyToClipboard(message, 'Message copied')}"
        >
          <Icon data="{copyIcon}" />
        </button>
      </div>
    </div>
  </div>
</div>
