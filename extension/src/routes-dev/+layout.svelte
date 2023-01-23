<script lang="ts">
import '$src/app.css';
import '@fontsource/fira-mono';

import SvgSpinner from '$src/components/spinners/SvgSpinner.svelte';
let loading = true;

setTimeout(() => {
  loading = false;
}, 2000);
</script>

<div class="min-h-screen">
  <div class="navbar bg-base-300">
    <div class="flex-none">
      <ul class="menu menu-horizontal px-1">
        <li><a href="/">Home</a></li>
        <li><a href="/tipSuccess">Tip Success</a></li>
        <li><a href="/verification">Verification</a></li>
        <li><a href="/noAccounts">No Accounts</a></li>
        <li><a href="/notVerified">Not verified</a></li>
      </ul>
    </div>
  </div>
  <div class="container mx-auto">
    {#if loading}
      <div class="flex items-center justify-center h-full">
        <SvgSpinner />
      </div>
    {:else}
      <slot />
    {/if}
  </div>
</div>
