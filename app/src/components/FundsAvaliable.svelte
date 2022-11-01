<script lang="ts">
import { chainConnected, chainStore, connectedTokenShortName } from '$src/appStore';
import { formatBalance } from '@polkadot/util';
import { polkadotAccountsStore } from './polkadotAccounts/store';

let freeBalance: string = '0 IDI';

async function getFunds() {
	const { api } = $chainStore;

	await api.query.system.account(
		$polkadotAccountsStore.selectedAccount.address,
		({ nonce, data: balance }) => {
			freeBalance = formatBalance(balance.free, { decimals: 12 }).replace('Unit', $connectedTokenShortName);
		}
	);
}

$: {
	if ($chainConnected && $polkadotAccountsStore.selectedAccount) {
		getFunds();
	}
}
</script>

<div class="flex flex-row pl-4">
	<span>Funds Avaliable: {freeBalance}</span>
</div>
