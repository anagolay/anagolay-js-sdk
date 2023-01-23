<script lang="ts">
import '@anagolay/types/augment-api';

import { AnVerificationRequest } from '@anagolay/types/augment-api';
import { Codec } from '@polkadot/types/types';
import { equals, isEmpty, isNil, length } from 'ramda';

import { chainStore } from '$src/appStore';
import TitleCard from '$src/components/base/TitleCard.svelte';
import { notificationsStore } from '$src/components/notifications/store';
import { polkadotAccountsStore } from '$src/components/polkadot/store';

import { mainStore, steps } from '../store';
const regex: RegExp =
  // eslint-disable-next-line no-useless-escape
  /^((?!-))(xn--)?[a-z0-9][a-z0-9-_]{0,61}[a-z0-9]{0,1}\.(xn--)?([a-z0-9\-]{1,61}|[a-z0-9-]{1,30}\.[a-z]{2,})$/;

let successAnimationClasses: string = '';
let domainNameCorrectFormat: boolean = !!$mainStore.domain;

/**
 * verify domain input
 */
async function verifyDomainInput() {
  if (isNil($mainStore.domain) || isEmpty($mainStore.domain) || length($mainStore.domain) < 4) {
    successAnimationClasses = '';
    domainNameCorrectFormat = false;
    $mainStore.verificationCode = undefined;
  } else {
    const regexSuccess = regex.exec($mainStore.domain);
    if (!isNil(regexSuccess)) {
      // check are there any proofs connected to this context
      const v: Codec =
        await $chainStore.api.query.verification.verificationRequestByAccountIdAndVerificationContext(
          $polkadotAccountsStore.selectedAccount.address,
          {
            UrlForDomain: [`https://${$mainStore.domain}`, $mainStore.domain]
          }
        );

      const r = v.toHuman() as unknown as AnVerificationRequest;

      if (!isNil(r) && !isEmpty(r)) {
        if (equals(r.status, 'Pending')) {
          console.log('verifyDomainInput', r);
          successAnimationClasses = 'input-success';
          domainNameCorrectFormat = true;
          $mainStore.verificationCode = r.key;
          $mainStore.verificationRequest = r;

          console.log('mainStore in addDomain', $mainStore);
        } else if (equals(r.status, 'Success')) {
          // this requires the check of the statement
          // domainNameCorrectFormat = false;
          domainNameCorrectFormat = true;
          $mainStore.verificationCode = r.key;
          $mainStore.verificationRequest = r;
          // notificationsStore.add('Domain already verified', 'error');
        } else {
          // failure
          successAnimationClasses = 'input-success';
          domainNameCorrectFormat = true;
          $mainStore.verificationCode = '';
          notificationsStore.add('Request failed, you will need to request the key again.', 'error');
        }
      } else {
        successAnimationClasses = 'input-success';
        domainNameCorrectFormat = true;
        $mainStore.verificationCode = '';
      }
    } else {
      domainNameCorrectFormat = false;
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function nextStep(e: any) {
  e.preventDefault();
  verifyDomainInput().then(() => {
    steps.gotoStep(4);
    setTimeout(() => {
      document.querySelector(`#step_${4}`).scrollIntoView({
        behavior: 'smooth'
      });
    }, 100);
  });
}
</script>

<TitleCard title="Add Domain" step="{3}">
  <form on:submit="{nextStep}">
    <div class="w-full input-group">
      <span>https://</span>
      <input
        type="text"
        placeholder="my-domain.io|com|net"
        class="input w-full {successAnimationClasses} focus:outline-none"
        bind:value="{$mainStore.domain}"
        on:input="{verifyDomainInput}"
      />
      <button disabled="{!domainNameCorrectFormat}" on:click="{nextStep}" class="btn btn-primary">Next</button
      >
    </div>
  </form>
</TitleCard>
