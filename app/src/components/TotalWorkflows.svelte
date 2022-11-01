<script lang="ts">
import { chainConnected, chainStore, totalIssuanceWithName } from '$src/appStore';
import StatisticBox from './base/StatisticBox.svelte';

let total: string = '';

async function run() {
	const { api } = $chainStore;
	total = (await api.query.workflows.total()).toString();
}

$: {
	if ($chainConnected) {
		run();
	}
}
</script>

<StatisticBox title="Workflows">
	{total}
</StatisticBox>
