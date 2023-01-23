<script lang="ts">
import { BN } from '@polkadot/util';
import { isNil } from 'ramda';
import { onMount } from 'svelte';

import { goto } from '$app/navigation';
import { errorsStore, fundsAvailable } from '$src/appStore';
import { sendMessage } from '$src/messaging/messaging';
import { selectedAccount } from '$src/routes/accounts/store';
import { makeVerificationContexts } from '$src/utils/chainApi';
import { getSentry } from '$src/utils/sentry';
import { formatBalance, getActiveTab, unitToSmallestUnits } from '$src/utils/utils';

import FundsAvailable from '../FundsAvailable.svelte';
import CustomTipButton from './CustomTipButton.svelte';
import TipButton from './TipButton.svelte';

let selectedAmount: number = 0;

let sendTipDisabled: boolean = true;

let feeToPay: string;

let totalCost: string = '0';

let sendingTx: boolean = false;

async function handleSendTip() {
  sendingTx = true;
  // control the messages, or errors, the CB will be called multiple times for an error, we want the first one
  let messageSent = false;

  const tab = await getActiveTab();
  const context = makeVerificationContexts(new URL(tab.url));

  await sendMessage(
    'pri(chain.tx.tipping.tip)',
    {
      params: { amount: selectedAmount, context: context[0] },
      sender: $selectedAccount.address
    },
    ({ error }) => {
      if (!messageSent) {
        if (!isNil(error)) {
          console.error(error);
          getSentry().captureException(error);
          messageSent = true;
          errorsStore.add(error);
        } else {
          sendingTx = false;
          messageSent = true;
          goto('/tipSuccess');
        }
      }
    }
  );
}

async function handleSelectTip(tipAmount: number) {
  // assign the selected value
  selectedAmount = tipAmount;
  // if this is nill then we will request it, since it is the same for any amount
  const tipValueBN = new BN(unitToSmallestUnits(selectedAmount));
  const feeAsBn = new BN(feeToPay);
  const total = tipValueBN.add(feeAsBn);
  if ($fundsAvailable.freeBn.lt(total)) {
    selectedAmount = 0;
    sendTipDisabled = true;
  } else {
    selectedAmount = tipAmount;
    sendTipDisabled = false;
  }
}

/**
 * Calculate the total extrinsic + tip
 */
function calculateTotal() {
  const feesAsBn = new BN(feeToPay);
  const selectedAmountAsBn = unitToSmallestUnits(selectedAmount);
  const total = selectedAmountAsBn.add(feesAsBn);
  totalCost = formatBalance(total, { withSiFull: true });
}

async function getFee() {
  const tab = await getActiveTab();

  const context = makeVerificationContexts(new URL(tab.url));
  const fee = await sendMessage('pri(chain.tipping.tip.paymentInfo)', {
    amount: '1', // any amount works, since we don't charge per percent
    context: context[0],
    sender: $selectedAccount.address
  });
  feeToPay = fee;
}

onMount(() => {
  getFee();
});

$: feeToPay && calculateTotal();
$: selectedAmount && calculateTotal();
$: {
  if ($selectedAccount) {
    selectedAmount = 0;
    sendTipDisabled = true;
  }
}
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->

<div class="flex flex-col w-full items-center text-center gap-4 h-full">
  <FundsAvailable />
  <div class="flex flex-col w-full">
    <span class="text-xl p-4 divider">Select tip amount</span>
    <div class="flex flex-row gap-2 justify-around p-4">
      <TipButton
        class="w-1/3"
        sendingTx="{sendingTx}"
        selectedAmount="{selectedAmount}"
        handleSelectTip="{handleSelectTip}"
        tipValue="{1}"
        feeToPay="{feeToPay}"
      />
      <TipButton
        class="w-1/3"
        sendingTx="{sendingTx}"
        selectedAmount="{selectedAmount}"
        handleSelectTip="{handleSelectTip}"
        tipValue="{5}"
        feeToPay="{feeToPay}"
      />
      <div class="divider divider-vertical">OR</div>
      <CustomTipButton
        class="w-1/3"
        sendingTx="{sendingTx}"
        selectedAmount="{selectedAmount}"
        handleSelectTip="{handleSelectTip}"
        feeToPay="{feeToPay}"
      />
    </div>
  </div>

  <!-- <div class="divider m-0">OR</div>

  <div class="flex justify-between items-center flex-row w-full">
    <span class="label-text w-full">Enter custom amount</span>
    <label class="input-group">
      <input type="text" placeholder="7" bind:value="{selectedAmount}" class="input input-bordered w-36" />
      <span>{tokenName}</span>
    </label>
  </div> -->
  <div class="alert flex flex-col min-h-16 justify-center items-center">
    <span>
      Fees of {formatBalance(feeToPay, { withSiFull: true })} will be applied to the submission.
    </span>

    <span>
      {#if selectedAmount}
        Total is {totalCost}
      {:else}
        Please select the tip amount to see the total
      {/if}
    </span>
  </div>

  <button
    class="btn btn-primary w-full {sendingTx && 'loading'}"
    disabled="{sendTipDisabled || selectedAmount === 0}"
    on:click="{handleSendTip}"
  >
    {sendingTx ? 'Sending ...' : 'Send a tip'}
  </button>
</div>
