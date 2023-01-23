<script>
import ProfileDropdown from './ProfileDropdown.svelte';
export let supportData;

let supporters = [...supportData];

let criteriaList = [
  { text: 'Most Recent', value: 'lastTip' },
  { text: 'Highest Tip', value: 'amount' }
];

function sortSupporters(value) {
  supporters = [...supportData.sort((a, b) => (a[value] < b[value] ? 1 : -1))];
}
</script>

<div class="w-1/2 flex flex-col rounded-lg bg-base-100 p-4 gap-4">
  <div class="text-lg text-accent-content">Top Supporters</div>
  <div class="form-control items-center">
    <ProfileDropdown options="{criteriaList}" action="{sortSupporters}" iconName="sort" />
  </div>
  <div class="flex flex-col">
    {#each supporters as { polkadotAvatar, hash, amount }}
      <div class="flex justify-between items-center border-b border-base-content py-2">
        <div class="rounded-full bg-accent-content p-1">
          <img width="20" class="mask mask-hexagon" src="{polkadotAvatar}" alt="polkadot icon" />
        </div>
        <div class="text-xs w-1/2 truncate">{hash}</div>
        <div class="text-accent-content text-sm">{amount} IDI</div>
      </div>
    {/each}
  </div>
  <div class="flex w-full justify-center pt-4">
    <button class="btn btn-primary w-fit">Share on Twitter</button>
  </div>
</div>
