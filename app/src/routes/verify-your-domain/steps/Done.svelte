<script>
  import TitleCard from '$src/components/base/TitleCard.svelte';
  import { alerts } from '$src/components/notifications/stores';
  import { mainStore } from '../store';
</script>

<TitleCard title="All done and saved!" step={6}>
  <div class="hero bg-base-200">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-xl font-bold">
          You have successfully claimed and proven the ownership of the {$mainStore.domain}!
        </h1>
        <p class="py-6">
          Soon you will be able to receive tips if you want and tip other people! Consider sharing this on
          social media to raise awareness of the project and help other content creators, like yourself, to
          protect their IP rights and get additional revenue stream!
        </p>
        <button
          class="btn btn-primary"
          on:click={() => alerts.add('Yeah, sorry about that, this is not implemented yet 😉', 'info')}
          >Share on twitter</button
        >
      </div>
    </div>
  </div>
</TitleCard>
