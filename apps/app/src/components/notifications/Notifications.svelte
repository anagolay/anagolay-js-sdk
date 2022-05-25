<script>
  import Notification from '../Notification.svelte';

  import { alerts } from './stores';

  $: console.debug('Alerts', $alerts);
</script>

<div class="stack" style="display: block;">
  {#each $alerts as a}
    <Notification infoLevel={a.infoLevel} data={a} />
  {/each}
</div>
