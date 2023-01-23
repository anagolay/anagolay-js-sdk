<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<script lang="ts">
import Hero from '../base/Hero.svelte';
</script>

<Hero>
  <div slot="title">
    <h1 class="text-2xl font-semibold">This creator hasn't signed up yet.</h1>
  </div>
  <div slot="body" class="flex flex-col">
    <p class="prose py-4">
      Here are a few things you can do to make them aware that you want to support them.
    </p>
    <ul class="steps steps-vertical">
      <li class="step">Reach out on their social accounts</li>
      <li class="step">
        <div>
          Point them to <a
            class="link link-primary"
            href="http://app.anagolay.network"
            target="_blank"
            rel="noopener noreferrer"
          >
            Anagolay App
          </a>
          to verify this website
        </div>
      </li>
      <li class="step">Done!</li>
    </ul>
  </div>
</Hero>
