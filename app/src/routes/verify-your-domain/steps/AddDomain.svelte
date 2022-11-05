<script lang="ts">
import TitleCard from '$src/components/base/TitleCard.svelte';
import { isEmpty, isNil, length } from 'ramda';
import { mainStore, steps } from '../store';
const regex =
  /^((?!-))(xn--)?[a-z0-9][a-z0-9-_]{0,61}[a-z0-9]{0,1}\.(xn--)?([a-z0-9\-]{1,61}|[a-z0-9-]{1,30}\.[a-z]{2,})$/;

let successAnimationClasses: string = '';
let domain: string;
let domainNameCorrectFormat: boolean = false;

async function verifyDomain() {
  if (isNil(domain) || isEmpty(domain) || length(domain) < 4) {
    successAnimationClasses = '';
    domainNameCorrectFormat = false;
    $mainStore.verificationCode = undefined;
  } else {
    const regexSuccess = regex.exec(domain);
    if (!isNil(regexSuccess)) {
      successAnimationClasses = 'input-success';
      domainNameCorrectFormat = true;
      $mainStore.domain = domain;
      await mainStore.calculateIdentifier();
    } else {
      domainNameCorrectFormat = false;
    }
  }
}

async function nextStep(e: MouseEvent & EventTarget & HTMLButtonElement) {
  e.preventDefault();
  steps.gotoStep(4);
  setTimeout(() => {
    document.querySelector(`#step_${4}`).scrollIntoView({
      behavior: 'smooth'
    });
  }, 100);
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
        bind:value="{domain}"
        on:input="{verifyDomain}"
      />
      <button disabled="{!domainNameCorrectFormat}" on:click="{nextStep}" class="btn btn-primary">Next</button
      >
    </div>
  </form>
</TitleCard>
