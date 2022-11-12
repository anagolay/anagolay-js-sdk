<script lang="ts">
  import { Confetti } from 'svelte-confetti';

  import { mainStore } from './store';
</script>

{#if $mainStore.statementCreated}
  <div id="confetti" class="confetti">
    <Confetti
      x={[-5, 5]}
      y={[0, 0.1]}
      delay={[500, 2000]}
      infinite
      duration="5000"
      amount="200"
      fallDistance="100vh"
    />
  </div>
{/if}

<div class="min-h-screen">
  <slot />
</div>

<style>
  .confetti {
    position: fixed;
    top: -50px;
    left: 0;
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    overflow: hidden;
    pointer-events: none;
  }
</style>
