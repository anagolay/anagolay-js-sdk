<script lang="ts">
  import FrostBox from '$src/components/base/FrostBox.svelte';
  import SvelteSeo from 'svelte-seo';
</script>

<SvelteSeo
  title="Anagolay Application"
  description="Companion application for Anagolay network. You can create Workflows, claim domains and much more."
/>
<div class="bcg-image px-20 pt-20 flex flex-col h-screen p-4">
  <div class="flex flex-row flex-wrap justify-between h-3/6">
    <FrostBox class="m-2 basis-72">
      <a
        href="https://anagolay.dev"
        target="_blank"
        class="text-2xl hover:text-white  text-slate-800 h-full w-full flex justify-center align-middle items-center"
      >
        Anagolay Dev
      </a>
    </FrostBox>
    <FrostBox class="m-2 basis-72 ">
      <a
        href="https://anagolay.network"
        target="_blank"
        class="text-2xl hover:text-white  text-slate-800 h-full w-full flex justify-center align-middle items-center"
      >
        Anagolay Network
      </a>
    </FrostBox>
    <FrostBox class="m-2 basis-72 ">
      <a
        href="https://kelp.digital"
        target="_blank"
        class="text-2xl hover:text-white  text-slate-800 h-full w-full flex justify-center align-middle items-center"
      >
        Kelp.digital
      </a>
    </FrostBox>
    <FrostBox class="m-2 basis-72 ">
      <a
        href="/verify-your-domain"
        sveltekit:prefetch
        class="text-2xl hover:text-white  text-slate-800 h-full w-full flex justify-center align-middle items-center"
      >
        Verify your Domain
      </a>
    </FrostBox>
  </div>
  <div class="bottom-5 right-5 fixed">
    <img
      class="w-24"
      src="https://macula.kelp.digital/ipfs/QmeGmeE2BBzvfBTkGzAXH29tN5ZD2mCmr4tiuAL8Te6MxD"
      alt="Anagolay Logo"
    />
  </div>
</div>

<style>
  .bcg-image {
    background-image: url('https://macula.kelp.digital/ipfs/bafybeifalapwme23cp2xwfmfjozu6yjsi6xtdhcqlb5lnorxiwevlfw7t4?auto=format&w=2670');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    background-attachment: fixed;
  }
  @media only screen and (max-width: 767px) {
    .bcg-image {
      background-image: url(https://macula.kelp.digital/ipfs/bafybeifalapwme23cp2xwfmfjozu6yjsi6xtdhcqlb5lnorxiwevlfw7t4?auto=format&w=900&q=80);
    }
  }
</style>
