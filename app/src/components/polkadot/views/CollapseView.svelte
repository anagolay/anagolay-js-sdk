<script lang="ts">
  import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
  import { isEmpty } from 'ramda';
  import { onMount } from 'svelte';

  import { steps } from '$src/routes/verify-your-domain/store';

  import { polkadotAccountsStore } from '../store';

  let localAccounts: InjectedAccountWithMeta[] = [];

  onMount(() => {
    if (!isEmpty(localAccounts)) {
      steps.gotoStep(2);
    }
  });
  $: localAccounts = $polkadotAccountsStore.injectedAccounts;
</script>

{#if isEmpty(localAccounts)}
  <div class="alert alert-warning shadow-lg rounded-none">
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="stroke-current flex-shrink-0 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        ><path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        /></svg
      >
      <span
        >Accounts are not loaded. Please click on the polkadot.js extension and allow this website to access
        the accounts</span
      >
    </div>
  </div>
{/if}
{#each localAccounts as account}
  <label class="label cursor-pointer p-4">
    <span class="label-text">{account.meta.name}</span>
    <input
      type="radio"
      name={account.address}
      value={account}
      class="radio radio-primary hover:bg-violet-600 active:bg-violet-700 outline-dashed"
      bind:group={$polkadotAccountsStore.selectedAccount}
      on:click={async () => {
        // if we are on higher than 4 revert to 4 since the account changed and te proof will change too
        if ($steps.currentStep > 4) {
          $steps.currentStep = 4;
        }
        if ($steps.currentStep < 3) {
          steps.gotoStep(3);
          setTimeout(() => {
            document.querySelector(`#step_${3}`).scrollIntoView({
              behavior: 'smooth'
            });
          }, 100);
        }
      }}
    />
  </label>
{/each}
