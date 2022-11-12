<script lang="ts">
  import { isEmpty } from 'ramda';
  import { onMount } from 'svelte';

  import TitleCard from '$src/components/base/TitleCard.svelte';
  import PolkadotAccounts from '$src/components/polkadot/Accounts.svelte';

  import { steps } from '../store';
  import { InjectedAccountExt } from '../types';

  let accounts: InjectedAccountExt[] = [];

  onMount(async () => {
    if (!isEmpty(accounts)) {
      steps.gotoStep(2);
    }
  });
</script>

<TitleCard title="Choose account" step={2}>
  <PolkadotAccounts showAs="collapse" />
</TitleCard>
