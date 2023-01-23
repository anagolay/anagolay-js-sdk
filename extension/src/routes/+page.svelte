<script lang="ts">
import { equals, isEmpty } from 'ramda';

import { domainVerificationStore, fundsAvailable, noFunds, tippingEnabled } from '$src/appStore';
import NoAccounts from '$src/components/accounts/NoAccounts.svelte';
import Error from '$src/components/Error.svelte';
import NotEnoughFunds from '$src/components/tipping/NotEnoughFunds.svelte';
import Tipping from '$src/components/tipping/Tipping.svelte';
import TippingNotEnabled from '$src/components/tipping/TippingNotEnabled.svelte';
import UnverifiedSource from '$src/components/verification/UnverifiedSource.svelte';
import { accountsStore } from '$src/routes/accounts/store';
</script>

{#if isEmpty($accountsStore)}
  <NoAccounts />
{:else if !$domainVerificationStore.verified}
  <UnverifiedSource />
{:else if !$tippingEnabled}
  <TippingNotEnabled />
{:else if equals($fundsAvailable.free, noFunds)}
  <NotEnoughFunds />
{:else if !equals($fundsAvailable.free, noFunds)}
  <Tipping />
{:else}
  <Error title="Unknown error">
    <div>
      <p>
        Please contact us on <a
          href="https://mastodon.social/@anagolay"
          target="_blank"
          rel="noopener noreferrer"
        >
          mastodon account
        </a>
        for more support.
      </p>
    </div>
  </Error>
{/if}
