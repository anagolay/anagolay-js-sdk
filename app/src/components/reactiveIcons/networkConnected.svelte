<script>
  import { chainConnected } from '$src/appStore';

  import MaterialIcon from '../base/MaterialIcon.svelte';
</script>

<div class="w-10 rounded-full mx-1">
  {#if $chainConnected}
    <MaterialIcon title="Chain connected" class="cursor-help" iconName="wifi" />
  {:else}
    <MaterialIcon title="Chain not connected" class="cursor-help" iconName="wifi_off" />
  {/if}
</div>
