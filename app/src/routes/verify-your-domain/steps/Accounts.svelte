<script lang="ts">
import { InjectedAccountExt } from '../types';
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp?client';
import type { InjectedExtension } from '@polkadot/extension-inject/types';
import { onMount } from 'svelte';
import TitleCard from '$src/components/base/TitleCard.svelte';
import { isEmpty, isNil } from 'ramda';
import { fade } from 'svelte/transition';
import { mainStore, steps } from '../store';

let accounts: InjectedAccountExt[] = [];

async function getInjectedAccounts(
  injectedPromise: Promise<InjectedExtension[]>
): Promise<InjectedAccountExt[]> {
  try {
    await injectedPromise;

    const accounts = await web3Accounts();

    return accounts.map(
      ({ address, meta }, whenCreated): InjectedAccountExt => ({
        address,
        meta: Object.assign({}, meta, {
          name: `${meta.name || 'unknown'} (${meta.source === 'polkadot-js' ? 'extension' : meta.source})`,
          whenCreated
        })
      })
    );
  } catch (error) {
    console.error('web3Accounts', error);

    return [];
  }
}
//  -------------------------

onMount(async () => {
  const injectedPromise = await web3Enable('anagolay-js/apps');
  accounts = await getInjectedAccounts(injectedPromise);
  if (!isEmpty(accounts)) {
    steps.gotoStep(2);
  }
});
</script>

<TitleCard title="Choose account" step="{2}">
  {#if isEmpty(accounts)}
    <div class="alert alert-warning shadow-lg  rounded-none">
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
          ></path></svg
        >
        <span
          >Accounts are not loaded. Please click on the polkadot.js extension and allow this website to access
          the accounts</span
        >
      </div>
    </div>
  {/if}
  {#each accounts as account}
    <label class="label cursor-pointer hover:bg-gray-900 p-4">
      <span class="label-text">{account.meta.name}</span>
      <input
        type="radio"
        name="{account.address}"
        value="{account.address}"
        class="radio radio-primary hover:bg-violet-600 active:bg-violet-700 outline-dashed"
        bind:group="{$mainStore.account}"
        on:click="{async () => {
          if ($mainStore.domain) {
            setTimeout(async () => {
              await mainStore.calculateIdentifier();
            }, 100);
          }

          // if we are on higher than 4 revert to 4 since the account changed and te proof will change too
          if ($steps.currentStep > 4) {
            $steps.currentStep = 4;
            $mainStore.proof = undefined;
          }
          if ($steps.currentStep < 3) {
            steps.gotoStep(3);
            setTimeout(() => {
              document.querySelector(`#step_${3}`).scrollIntoView({
                behavior: 'smooth'
              });
            }, 100);
          }
        }}"
      />
    </label>
  {/each}
  <!-- <div class="flex flex-col gap-3">
  {#each accounts as account}
    <div class="flex justify-center">
      <ul class="bg-white rounded-lg border border-gray-200 w-full text-gray-900">
        <li class="px-6 py-2 border-b border-gray-200 w-full ">address {account.address}</li>
        <li class="px-6 py-2 border-b border-gray-200 w-full ">name {account.meta.name}</li>
        <li class="px-6 py-2 border-b border-gray-200 w-full ">
          when created {account.meta.whenCreated}
        </li>
        <li class="px-6 py-2 border-b border-gray-200 w-fit">source {account.meta.source}</li>
      </ul>
    </div>
  {/each}
</div> -->
</TitleCard>
