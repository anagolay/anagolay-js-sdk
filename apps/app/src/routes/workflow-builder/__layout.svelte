<script>
  import Notifications from '$src/components/notifications/Notifications.svelte';

  import './drawflow.css';
</script>

<div>
  <slot />
  <Notifications />
</div>
