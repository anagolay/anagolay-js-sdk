<script lang="ts">
import { pallets } from '@anagolay/api';
import {
  AnVerificationContext,
  AnVerificationStatus,
  Tip,
  TippingSettings,
  VerificationContext,
  VerificationRequest
} from '@anagolay/types';
import { Balance } from '@polkadot/types/interfaces';
import { formatBalance, isString, u8aToString } from '@polkadot/util';
import { ascend, call, compose, converge, descend, equals, keys, prop, sort, toLower } from 'ramda';
import { onMount } from 'svelte';

import { chainDecimalsStore, chainStore, connectedTokenShortName } from '$src/appStore';
import Accordion from '$src/components/base/Accordion.svelte';
import { notificationsStore } from '$src/components/notifications/store';
import { polkadotAccountsStore } from '$src/components/polkadot/store';
import { timeAgo } from '$src/utils/time';

export let channel: VerificationRequest;

let saveDisabled: boolean = true;
let tippingEnabled: boolean = false;
let showTipping: boolean = true;
let sendTipsToAddress: string = '';

let totalReceived: string = '';

let savingSettings: boolean = false;

// let transactions: AnTip[] = [];
let transactions: Tip[] = [];

const colorsByStatus: Record<keyof AnVerificationStatus, string> = {
  Success: 'badge-success',
  Pending: 'badge-info',
  Failure: 'badge-error',
  Waiting: 'badge-warning'
};

function colorForStatus({ status: _status }: VerificationRequest) {
  const status = _status.toHuman(); // this is the keyof VerificationRequest case
  if (isString(status)) {
    return colorsByStatus[status as keyof AnVerificationStatus];
  } else {
    return colorsByStatus[keys(status)[0] as keyof AnVerificationStatus];
  }
}
function statusName({ status }: VerificationRequest) {
  if (status.isSuccess) {
    return 'Verified';
  } else if (status.isFailure) {
    showTipping = false;
    return 'Failed';
  } else {
    return status.toString();
  }
}

/**
 * return the first context, usually it's the one with protocol
 * @param context
 */
function contextForChannel(context: VerificationContext) {
  return u8aToString(context.asUrlForDomain[0]);
}
/**
 * Retrieve tips
 */
async function getTransactions() {
  const txs: Tip[] = await $chainStore.api.rpc.tipping.getTips(
    $polkadotAccountsStore.selectedAccount.address,
    channel.context,
    0,
    1
  );
  transactions = sortTxNewToOld(txs);
}

/**
 * sort the tips from new to old, (DESC)
 * @param txs
 */
function sortTxNewToOld(txs: Tip[]): Tip[] {
  // all kudos to https://stackoverflow.com/a/56464204/2764898
  const makeSort = converge(call, [
    ({ dir }) => (dir === 'asc' ? ascend : descend),
    ({ isNumber, key }) => (isNumber ? compose(parseFloat, prop(key)) : compose(toLower, prop(key)))
  ]);
  const sorter = makeSort({ dir: 'desc', isNumber: true, key: 'createdAt' });

  return sort(sorter, txs);
}

/**
 * enabled or disabled from the chain
 */
function getTippingStatus() {
  $chainStore.api.query.tipping
    .tippingSettingsByAccountIdAndVerificationContext(
      $polkadotAccountsStore.selectedAccount.address,
      channel.context
    )
    .then(async (req: TippingSettings) => {
      tippingEnabled = req.enabled.toJSON();
      if (tippingEnabled) {
        sendTipsToAddress = req.account.toString();
        await getTransactions();
      }
    });
}

/**
 * Update tipping settings, make an extrinsic
 */
async function updateTippingSettings() {
  window.addEventListener('message', (message) => {
    // handle the polkadot cancel button
    if (equals(message.data.error, 'Cancelled')) {
      saveDisabled = true;
      savingSettings = false;
      notificationsStore.add('Action canceled', 'info');
    }
  });
  savingSettings = true;

  const signer = (await polkadotAccountsStore.getInjectorForSelectedAccount()).signer;

  const r = await pallets.tipping.updateSettings(
    {
      context: channel.context.toHuman() as AnVerificationContext,
      enabled: tippingEnabled,
      account: sendTipsToAddress
    },
    $polkadotAccountsStore.selectedAccount.address,
    {
      signer
    }
  );
  r.on('error', console.error);
  r.once('TippingSettingsUpdated', async () => {
    savingSettings = false;
    notificationsStore.add('Settings updated', 'success');
    await getTransactions();
  });
  r.once('finalized', () => {
    notificationsStore.add('Action finalized');
  });
}

onMount(() => {
  sendTipsToAddress = $polkadotAccountsStore.selectedAccount.address;
  getTippingStatus();
  $chainStore.api.rpc.tipping
    .totalReceived($polkadotAccountsStore.selectedAccount.address, channel.context)
    .then((r: Balance) => {
      totalReceived = formatBalance(r, {
        decimals: $chainDecimalsStore,
        withSiFull: false,
        withUnit: $connectedTokenShortName
      });
    });
});

$: {
  if (sendTipsToAddress && tippingEnabled) {
    saveDisabled = false;
  }
}
</script>

<Accordion class="bg-base-300">
  <svelte:fragment slot="title">
    <!-- link and status -->
    <div class="flex justify-between items-center gap-2 w-full">
      <span class="text-lg min-w-[14rem]">
        {contextForChannel(channel.context)}
      </span>
      <!-- content here -->
      <div class="divider divider-vertical">|</div>
      <span class="flex-1 text-center">Total received: {totalReceived}</span>
      <div class="divider divider-vertical">|</div>
      <div class="btn-group">
        <button class="btn min-w-[8rem]">
          <div class="badge {colorForStatus(channel)}">{statusName(channel)}</div>
        </button>
        <button class="btn min-w-[8rem]  ">
          <div class="badge {tippingEnabled ? 'badge-success' : ''}">
            Tipping {tippingEnabled ? 'enabled' : 'disabled'}
          </div>
        </button>
      </div>
    </div>
  </svelte:fragment>
  <div slot="content" class="flex flex-col gap-4">
    {#if showTipping}
      <!-- Tipping settings -->
      <Accordion class="">
        <div slot="title">Show Tipping Settings</div>
        <div slot="content">
          <p class="w-full">
            Enabling tipping allows you to receive the community support in a form of IDI tokens which you can
            later use in a variety of ways.
          </p>
          <div class="divider">Settings Section</div>
          <div class="flex flex-col gap-4">
            <div class="form-control">
              <label class="label" for="tipAccunt">
                <span class="label-text">
                  To which address tips will be sent. By default is the owner of the verification.</span
                >
              </label>

              <label class="input-group">
                <span>Address</span>
                <input type="text" bind:value="{sendTipsToAddress}" class="input input-bordered w-full" />
              </label>
            </div>
            <div class="flex justify-between items-center">
              <label class="label" for="tipSettings">
                <span class="label-text">Disable Tipping</span>
              </label>
              <input type="checkbox" class="toggle toggle-primary" bind:checked="{tippingEnabled}" />
              <label class="label" for="tipSettings">
                <span class="label-text">Enable Tipping</span>
              </label>
            </div>

            <button
              disabled="{saveDisabled}"
              class="btn btn-primary {savingSettings ? 'loading' : ''}"
              on:click="{updateTippingSettings}">Save settings</button
            >
          </div>
        </div>
      </Accordion>
      {#if tippingEnabled}
        <Accordion>
          <div slot="title" class="">Latest transactions</div>
          <svelte:fragment slot="content">
            <div class="w-full grid grid-cols-3 gap-4">
              {#each transactions as transaction}
                <div class="flex items-center gap-2 p-4 bg-base-200 rounded-lg">
                  <div>
                    #{transaction.blockNumber.toNumber()}
                  </div>
                  <div class="font-bold text-accent-content">
                    {formatBalance(transaction.amount, { withSiFull: true, withUnit: 'IDI', decimals: 12 })}
                  </div>
                  <div class="text-sm cursor-default">
                    {timeAgo(transaction.createdAt.toNumber())}
                  </div>
                </div>
              {/each}
            </div>
          </svelte:fragment>
        </Accordion>
      {/if}
    {:else}
      <div>You cannot enable tipping on failed verifications</div>
    {/if}
  </div>
</Accordion>
