<script lang="ts">
  import { isEmpty, isNil, length } from 'ramda';

  import TitleCard from '$src/components/base/TitleCard.svelte';

  import { mainStore, steps } from '../store';
  const regex: RegExp =
    // eslint-disable-next-line no-useless-escape
    /^((?!-))(xn--)?[a-z0-9][a-z0-9-_]{0,61}[a-z0-9]{0,1}\.(xn--)?([a-z0-9\-]{1,61}|[a-z0-9-]{1,30}\.[a-z]{2,})$/;

  let successAnimationClasses: string = '';
  let domainNameCorrectFormat: boolean = !!$mainStore.domain;

  async function verifyDomain() {
    if (isNil($mainStore.domain) || isEmpty($mainStore.domain) || length($mainStore.domain) < 4) {
      successAnimationClasses = '';
      domainNameCorrectFormat = false;
      $mainStore.verificationCode = undefined;
    } else {
      const regexSuccess = regex.exec($mainStore.domain);
      if (!isNil(regexSuccess)) {
        successAnimationClasses = 'input-success';
        domainNameCorrectFormat = true;
        $mainStore.verificationCode = undefined;
      } else {
        domainNameCorrectFormat = false;
      }
    }
  }

  function nextStep(e: any) {
    e.preventDefault();
    steps.gotoStep(4);
    setTimeout(() => {
      document.querySelector(`#step_${4}`).scrollIntoView({
        behavior: 'smooth'
      });
    }, 100);
  }
</script>

<TitleCard title="Add Domain" step={3}>
  <form on:submit={nextStep}>
    <div class="w-full input-group">
      <span>https://</span>
      <input
        type="text"
        placeholder="my-domain.io|com|net"
        class="input w-full {successAnimationClasses} focus:outline-none"
        bind:value={$mainStore.domain}
        on:input={verifyDomain}
      />
      <button disabled={!domainNameCorrectFormat} on:click={nextStep} class="btn btn-primary">Next</button>
    </div>
  </form>
</TitleCard>
