<script context="module">
  export const prerender = true;
</script>

<script lang="ts">
  import { onMount } from 'svelte';
  import SvelteSeo from 'svelte-seo';

  import { browser } from '$app/environment';
  import { pageTitle } from '$src/appStore';

  import Accounts from './steps/Accounts.svelte';
  import AddDomain from './steps/AddDomain.svelte';
  import ChooseMethod from './steps/ChooseMethod.svelte';
  import Done from './steps/Done.svelte';
  import SignandSave from './steps/SignAndSave.svelte';
  import Steps from './steps/Steps.svelte';
  import { mainStore, steps } from './store';

  const title: string = 'Verify your domain';

  // showSidebar.set(false);
  pageTitle.set(title);

  onMount(() => {
    return mainStore.reset;
  });

  $: {
    if (browser) {
      window.localStorage.setItem('verificationStore', JSON.stringify($mainStore));
    }
  }
</script>

<SvelteSeo
  {title}
  description="A must have proof for all content creators and people who build their personal brand with their personal website."
/>

<div class="lg:container lg:mx-auto p-4">
  <div class="flex flex-row w-full">
    <Steps />
    <div class="flex flex-col gap-3 my-4 w-3/4">
      <Accounts />
      {#if $steps.currentStep >= 3}
        <AddDomain />
      {/if}
      {#if $steps.currentStep >= 4}
        <ChooseMethod />
      {/if}
      {#if $steps.currentStep >= 5}
        <SignandSave />
      {/if}
      {#if $steps.currentStep >= 6}
        <Done />
      {/if}
    </div>
  </div>
</div>
