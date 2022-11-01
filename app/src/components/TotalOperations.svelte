<script lang="ts">
import { chainConnected, chainStore, totalIssuanceWithName } from '$src/appStore';
import StatisticBox from './base/StatisticBox.svelte';

let total: string = '';

async function run() {
	const { api } = $chainStore;
	total = (await api.query.operations.total()).toString();
}

$: {
	if ($chainConnected) {
		run();
	}
}
</script>

<StatisticBox title="Operations" class="shadow">
	{total}
</StatisticBox>
