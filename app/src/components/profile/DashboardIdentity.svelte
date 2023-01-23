<script>
export let userData;
const { userName, verified, fullName, contact } = userData;
</script>

<div class="w-1/2 flex flex-col gap-8 rounded-lg bg-base-100 flex-grow p-4">
  <div class="flex items-center justify-between text-accent-content">
    <div class="text-lg">Identity</div>
    {#if verified}
      <div class="badge p-4 badge-success">Verified</div>
    {:else}
      <div class="badge p-4 badge-warning">Unverified</div>
    {/if}
  </div>
  <div class="flex gap-2">
    <img
      class="rounded-full"
      width="50"
      src="https://www.shareicon.net/data/512x512/2016/08/18/815412_people_512x512.png"
      alt="avatar"
    />
    <div>
      <div class="text-accent-content">{userName}</div>
      <div>{fullName}</div>
    </div>
  </div>
  <div class="flex flex-col gap-6">
    {#each contact as { media, data }}
      <div class="flex justify-between gap-2 text-sm">
        <div>{media}</div>
        <div class="text-accent-content">{data}</div>
      </div>
    {/each}
  </div>
</div>
