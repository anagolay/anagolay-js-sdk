<script lang="ts">
import { bestBlock, finalizedBlock } from '$src/appStore';
import Digits from './base/Digits.svelte';
import StatisticBox from './base/StatisticBox.svelte';
</script>

<StatisticBox title="Best block">
	<Digits digits="{$bestBlock}" />
</StatisticBox>

<StatisticBox title="Finalized block">
	<Digits digits="{$finalizedBlock}" />
</StatisticBox>
