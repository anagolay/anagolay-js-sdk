<script lang="ts">
import { BN } from '@polkadot/util';
import { onMount } from 'svelte';

import { fundsAvailable } from '$src/appStore';
import { tokenName } from '$src/config';
import { unitToSmallestUnits } from '$src/utils/utils';
let classNames: string = '';
export { classNames as class };

export let sendingTx: boolean;
export let selectedAmount: number;
export let handleSelectTip: (amount: number) => void;
export let tipValue: number;
export let feeToPay: string;

let disableTipButton: boolean = false;

function decideToDisableButton() {
  const tipValueBN = new BN(unitToSmallestUnits(tipValue));
  const feeAsBn = new BN(feeToPay);
  const total = tipValueBN.add(feeAsBn);

  if ($fundsAvailable.freeBn.lt(total)) {
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

<div class="{classNames}">
  <button
    disabled="{sendingTx || disableTipButton}"
    class="btn hover:btn-accent w-full {selectedAmount === tipValue ? 'btn-accent' : ''}"
    on:click="{() => handleSelectTip(tipValue)}"
  >
    {tipValue}
    {tokenName}
  </button>
</div>
