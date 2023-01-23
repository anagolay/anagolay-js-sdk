<script lang="ts">
import { makeBlockUrl } from '@anagolay/util';
import { fade } from 'svelte/transition';

import { connectedChainStore, tippingHash, tippingTransactionFinalized } from '$src/appStore';
import LottiePlayer from '$src/components/LottiePlayer.svelte';
</script>

<div class="p-4 flex flex-col justify-center items-center">
  <LottiePlayer class="h-52 p-0" src="/lottie/ok_success_animation.json" loop="{false}" />

  <div class="text-center text-success text-lg">TIP SENT</div>
  <div class="text-center">Thank you for supporting this creator!</div>
  <div class="prose text-center text-xs">You may close this popup ( click the Anagolay extension logo )</div>
</div>

{#if $tippingTransactionFinalized}
  <div class="prose text-center text-xs absolute bottom-0 right-0 p-4" transition:fade>
    <a
      target="_blank"
      rel="noreferrer"
      class="link"
      href="{makeBlockUrl($connectedChainStore, $tippingHash).toString()}"
      >Transaction finalized
    </a>
  </div>
{:else}
  <div class="prose text-center text-xs absolute bottom-0 right-0 p-4 animate-pulse">
    Transaction is finalizing ...
  </div>
{/if}
