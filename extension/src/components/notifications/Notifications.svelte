<script>
  import Notification from './Notification.svelte';
  import { notificationsStore } from './store';
</script>

<div class="stack" style="display: block;">
  {#each $notificationsStore as a}
    <Notification infoLevel="{a.infoLevel}" data="{a}" />
  {/each}
</div>
