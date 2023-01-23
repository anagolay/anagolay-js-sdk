<script lang="ts">
import { verificationContextStore } from '$src/appStore';
import UnverifiedSource from '$src/components/verification/UnverifiedSource.svelte';
</script>

{#if $verificationContextStore}
  <div class="flex flex-col gap-2">
    <div class="h-16 flex justify-between items-center">
      <span class="bg-base-300 p-4"> Method</span>
      <span>{$verificationContextStore.action}</span>
    </div>
    <div class="h-16 flex justify-between items-center">
      <span class="bg-base-300 p-4"> Status</span>
      <span>{$verificationContextStore.status}</span>
    </div>
    <div class="h-16 flex justify-between items-center">
      <span class="bg-base-300 p-4">Owner account</span>
      <span class="text-sm">{$verificationContextStore.holder}</span>
    </div>
  </div>
{:else}
  <UnverifiedSource />
{/if}
