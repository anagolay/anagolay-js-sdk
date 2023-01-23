<script lang="ts">
import { onMount } from 'svelte';

import AccountList from '$src/components/accounts/AccountList.svelte';
import { sendMessage } from '$src/messaging/messaging';
import type { RequestAccountCreateSuri } from '$src/types';

import { selectedAccount } from './store';

onMount(() => {
  sendMessage('pri(accounts.getAccountSelected)').then((e: RequestAccountCreateSuri) => {
    selectedAccount.set(e);
  });
});
</script>

<AccountList />
