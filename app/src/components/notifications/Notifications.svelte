<script>
import Notification from './Notification.svelte';
import { notifications } from './stores';
</script>

<div class="stack" style="display: block;">
  {#each $notifications as a}
    <Notification infoLevel="{a.infoLevel}" data="{a}" />
  {/each}
</div>
