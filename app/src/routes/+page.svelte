<script lang="ts">
import { pageTitle } from '$src/appStore';
import SvelteSeo from 'svelte-seo';
import BlockStats from '$src/components/BlockStats.svelte';
import TotalIssuance from '$src/components/TotalIssuance.svelte';
import TotalOperations from '$src/components/TotalOperations.svelte';
import TotalWorkflows from '$src/components/TotalWorkflows.svelte';
import TotalPoe from '$src/components/TotalPoe.svelte';
import TotalStatements from '$src/components/TotalStatements.svelte';
import BlockHeaders from '$src/components/BlockHeaders.svelte';

const title: string = 'Anagolay Application';
pageTitle.set(title);
</script>

<SvelteSeo
  title="{title}"
  description="Companion application for Anagolay network. You can create Workflows, claim domains and much more."
/>

<div class="p-4">
  <div class="flex flex-row content-evenly gap-2 flex-wrap w-full">
    <TotalOperations />
    <TotalWorkflows />
    <TotalPoe />
    <TotalStatements />
    <BlockStats />
    <TotalIssuance />
  </div>
  <div class="mt-4 grid grid-cols-1 w-full">
    <BlockHeaders />
  </div>
</div>
