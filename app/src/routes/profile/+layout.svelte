<script lang="ts">
import { polkadotAccountsStore } from '$src/components/polkadot/store';
import NavBar from '$src/components/profile/ProfileNavBar.svelte';

$: !$polkadotAccountsStore.selectedAccount;
</script>

{#if !$polkadotAccountsStore.selectedAccount}
  <div class="w-full flex items-center justify-center min-h-[90vh]">
    Please select the Account to see your channels
  </div>
{:else}
  <div class="w-full flex flex-col items-start">
    <NavBar />
    <div class="w-full min-h-[90vh] p-8">
      <slot />
    </div>
  </div>
{/if}
