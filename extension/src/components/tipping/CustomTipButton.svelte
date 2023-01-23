<script lang="ts">
import { BN } from '@polkadot/util';
import { lte } from 'ramda';
import { onMount } from 'svelte';

import { fundsAvailable } from '$src/appStore';
import { tokenName } from '$src/config';
import { unitToSmallestUnits } from '$src/utils/utils';

let classNames: string = '';
export { classNames as class };
export let selectedAmount: number;

export let sendingTx: boolean;
export let handleSelectTip: (amount: number) => void;
export let feeToPay: string;

let tipValue: number;
let disableTipButton: boolean = false;

function tipSmallerThanFunds(): boolean {
  const tipValueBN = new BN(unitToSmallestUnits(tipValue));
  const feeAsBn = new BN(feeToPay);
  const total = tipValueBN.add(feeAsBn);

  return $fundsAvailable.freeBn.lt(total);
}

function decideToDisableButton() {
  if (lte(tipValue, 0)) {
    return 1;
  }
  const smaller = tipSmallerThanFunds();

  if (smaller) {
    disableTipButton = true;
  } else {
    disableTipButton = false;
  }
}

onMount(() => {
  decideToDisableButton();
});

$: feeToPay && decideToDisableButton();
$: $fundsAvailable.freeBn && decideToDisableButton();
</script>

<div class="form-control {classNames}">
  <label class="input-group">
    <input
      id="customAmount"
      type="number"
      bind:value="{tipValue}"
      placeholder="7.1"
      disabled="{sendingTx || disableTipButton}"
      class="btn hover:btn-accent hover:placeholder:text-white input input-ghost w-full max-w-xs {selectedAmount
        ? 'input-bordered input-success'
        : ''}"
      on:input="{() => {
        if (tipValue <= 0) {
          tipValue = 1;
          handleSelectTip(1);
        } else {
          handleSelectTip(tipValue);
        }
      }}"
    />
    <span class="font-semibold">{tokenName}</span>
  </label>
</div>
