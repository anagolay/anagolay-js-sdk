<script lang="ts">
import { chainConnected, chainStore, totalIssuanceWithName } from '$src/appStore';
import StatisticBox from './base/StatisticBox.svelte';

let total: string = '';

async function run() {
  const { api } = $chainStore;
  total = (await api.query.poe.proofTotal()).toString();
}

$: {
  if ($chainConnected) {
    run();
  }
}
</script>

<StatisticBox title="PoEs" class="shadow">
  {total}
</StatisticBox>
