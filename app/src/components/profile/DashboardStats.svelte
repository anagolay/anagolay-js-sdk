<script>
/* Get freeBalance */
import { formatBalance } from '@polkadot/util';

import { chainConnected, chainStore, connectedTokenShortName } from '$src/appStore';
import { polkadotAccountsStore } from '$src/components/polkadot/store';

let freeBalance = '0 IDI';

async function getFunds() {
  const { api } = $chainStore;

  await api.query.system.account($polkadotAccountsStore.selectedAccount.address, ({ data: balance }) => {
    freeBalance = formatBalance(balance.free, { decimals: 12 }).replace('Unit', $connectedTokenShortName);
  });
}

$: {
  if ($chainConnected && $polkadotAccountsStore.selectedAccount) {
    getFunds();
  }
}
/* Finish freeBalance */

export let statsData;
const { breakdown, uSvalue } = statsData;

let uSAmount = 0;
$: uSAmount = (parseInt(freeBalance) * 1000 * uSvalue).toLocaleString('en-US');
</script>

<div class="stats shadow">
  <div class="stat gap-2">
    <div class="text-accent-content text-lg">Funds Available</div>
    <div class="stat-value">{freeBalance}</div>
    <div class="stat-desc text-sm">{uSAmount} USD</div>
  </div>

  <div class="stat">
    {#each breakdown as { type, amount }}
      <div class="stat-title flex justify-between w-full">
        <div>{type}</div>
        <div>{amount} IDI</div>
      </div>
    {/each}
  </div>
</div>
