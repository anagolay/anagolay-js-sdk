<script lang="ts">
import { accountsStore } from '$src/routes/accounts/store';

import Account from './Account.svelte';
</script>

<div class="flex flex-col gap-2">
  {#each $accountsStore as { name, address }}
    <Account name="{name}" address="{address}" />
  {/each}
</div>
