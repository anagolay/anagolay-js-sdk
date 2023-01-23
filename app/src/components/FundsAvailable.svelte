<script lang="ts">
import { formatBalance } from '@polkadot/util';

import { chainConnected, chainStore, connectedTokenShortName } from '$src/appStore';

import { polkadotAccountsStore } from './polkadot/store';

let freeBalance: string = '0 IDI';

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
</script>

<div class="flex flex-row pl-4">
  <span>Funds Available: {freeBalance}</span>
</div>
