<script>
import MaterialIcon from '../base/MaterialIcon.svelte';

export let transactions;
let selectedTransactions = [...transactions].slice(0, 6);
let filter = '';

function filterTransactions(string) {
  selectedTransactions = [
    ...transactions.filter((transaction) => {
      for (let key of Object.keys(transaction)) {
        if (transaction[key].toString().includes(string)) {
          return true;
        }
      }
      return false;
    })
  ].slice(0, 6);
}

function timeStamptoTimeAgo(timeStamp) {
  const now = new Date();
  const time = new Date(timeStamp);
  const secs = Math.floor((now.getTime() - time.getTime()) / 1000);
  let timeAgo = '';
  if (secs < 60) {
    timeAgo = secs + ' sec';
  } else if (secs < 60 * 60) {
    timeAgo = Math.floor(secs / 60) + ' min';
  } else if (secs < 3600 * 24) {
    timeAgo = Math.floor(secs / 3600) + ' hs';
  } else {
    timeAgo = Math.floor(secs / (3600 * 24)) + ' days';
  }
  return timeAgo;
}
$: filterTransactions(filter);
</script>

<div class="w-full h-full rounded-2xl bg-base-100 p-4">
  <div class="flex w-full justify-between gap-8">
    <div class="text-accent-content text-lg">Transactions</div>
    <input
      type="text"
      bind:value="{filter}"
      placeholder="Filter by domain name, amount, etc..."
      class="input input-bordered input-sm w-full max-w-xs"
    />
  </div>
  <div class="flex flex-col flex-grow w-full overflow-y-auto">
    {#each selectedTransactions as { id, websiteName, type, amount, token, from, to, timeStamp }}
      <div class="flex flex-col basis-1 border-b border-base-content/50 p-4">
        <div class="flex w-full justify-between">
          <div class="flex items-center">
            #{id} - {websiteName}
            {#if type === 'payment'}
              <MaterialIcon iconName="call_made" class="text-error text-sm" />
            {:else}
              <MaterialIcon iconName="call_received" class="text-success text-sm" />
            {/if}
          </div>
          <div class="text-accent-content font-bold">
            {amount}
            {token}
          </div>
        </div>
        <div class="flex w-full justify-between items-center">
          <div class="flex text-xs w-2/3">
            <div class="input-group input-group-sm w-1/2 flex-grow-0">
              <span class="px-1 bg-transparent">From</span>
              <span class="px-1 bg-transparent text-accent-content truncate">{from}</span>
            </div>
            <div class="input-group input-group-sm w-1/2 flex-grow-0">
              <span class="px-1 bg-transparent">To</span>
              <span class="px-1 bg-transparent text-accent-content truncate">{to}</span>
            </div>
          </div>
          <div class="text-sm cursor-default" title="{new Date(timeStamp)}">
            {timeStamptoTimeAgo(timeStamp)} ago
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>
