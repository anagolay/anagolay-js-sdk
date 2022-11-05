<script lang="ts">
import { chainConnected, chainStore } from '$src/appStore';
import { bnToBn, formatBalance } from '@polkadot/util';
import StatisticBox from './base/StatisticBox.svelte';

let totalIssuanceWithName: string = '0 Unit';

async function formatTotalIssuance() {
  const { api } = $chainStore;
  const t = await api.query.balances?.totalIssuance();

  const tAsBn = bnToBn(t.toString());
  const i = formatBalance(tAsBn, {
    decimals: parseInt(t.registry.chainDecimals.toString(), 10)
  }).replace('Unit', t.registry.chainTokens.toString());
  totalIssuanceWithName = i;
}

$: {
  if ($chainConnected) {
    formatTotalIssuance();
  }
}
</script>

<StatisticBox title="Total Issuance" class="shadow">
  {totalIssuanceWithName}
</StatisticBox>
