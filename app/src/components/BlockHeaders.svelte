<script lang="ts">
import '@polkadot/api-augment';
import { chainConnected, chainStore } from '$src/appStore';
import { makeBlockUrl } from '$src/utils/polkdotUrls';
import { clone, equals, isNil, prepend, take } from 'ramda';
import { onMount } from 'svelte';
import Digits from './base/Digits.svelte';
import MaterialIcon from './base/MaterialIcon.svelte';
import { msToSec } from '$src/utils/utils';
import type { UnsubscribePromise } from '@polkadot/api/types';

/**
 * How many records we will show in the list
 */
const maxRecords = 52;

let unsub: UnsubscribePromise;
let cancelInterval: NodeJS.Timer;

let lastBlocks: { blockNumber: number; hash: string; twoBlocksTimeDiff: number }[] = [];

/**
 * Aura slot duration in miliseconds
 */
let slotDuration: number;

/**
 * diff in seconds between lastBlock and LastBlock - 1
 */
let elapsedBetweenBlocks: number;

async function run() {
  const { api } = $chainStore;
  const d = await api.call.auraApi.slotDuration();
  slotDuration = parseInt(d.toString(), 10);

  let lastBlockTime: number;
  let prevBlockTime: number;

  // Subscribe to the new headers
  const u = await api.rpc.chain.subscribeNewHeads(async (lastHeader) => {
    // console.debug(`last block #${lastHeader.number} has hash ${lastHeader.hash}`);

    // get the last block time
    const t = await api.query.timestamp.now();

    if (isNil(prevBlockTime) && isNil(lastBlockTime)) {
      lastBlockTime = t.toNumber();
      prevBlockTime = lastBlockTime - slotDuration;
    } else {
      prevBlockTime = clone(lastBlockTime);
    }
    // set this after the prev time so we can use old value
    lastBlockTime = t.toNumber();

    // used to start countdown
    elapsedBetweenBlocks = Math.floor((lastBlockTime - prevBlockTime) / 1000);

    // must clear interval otherwise the countdown goes crazy
    clearInterval(cancelInterval);

    // take first amount of records specifid by maxRecords
    lastBlocks = take(
      maxRecords,
      prepend(
        {
          blockNumber: lastHeader.number.toNumber(),
          hash: lastHeader.hash.toString(),
          twoBlocksTimeDiff: clone(elapsedBetweenBlocks)
        },
        lastBlocks
      )
    );

    cancelInterval = setInterval(() => {
      if (!equals(elapsedBetweenBlocks, 0)) {
        elapsedBetweenBlocks -= 1;
      }
    }, 1000);
  });
  unsub = u as unknown as UnsubscribePromise;
}

function showTimeVariant(timeDiff: number): string {
  const slotAsSeconds = slotDuration / 1000;
  if (timeDiff > slotDuration) {
    // return `${slotAsSeconds}s(+${timeDiff}s)`;
    return `
<span class="gap-2">${timeDiff}
  <div class="badge badge-warning">+${timeDiff - slotAsSeconds}</div>
</span>`;
  } else if (equals(timeDiff, slotAsSeconds)) {
    // return `${slotAsSeconds}s`;
    return `
<span class="gap-2">${timeDiff}
  <div class="badge badge-success">${timeDiff - slotAsSeconds}</div>
</span>`;
  } else {
    // return `${slotAsSeconds}s(-${timeDiff}s)`;
    return `
<span class="gap-2">${timeDiff}
  <div class="badge badge-warning">${timeDiff - slotAsSeconds}</div>
</span>`;
  }
}

onMount(() => {
  return () => {
    console.log('unmounting');

    unsub;
  };
});

$: {
  if ($chainConnected) {
    run();
  }
}
</script>

<div class="mt-2">
  <!-- <span class="text">Targeted slot duration {slotDuration / 1000}seconds</span> -->
  <table class="table compact w-full">
    <thead>
      <tr>
        <th>Block number</th>
        <th>Hash</th>
        <th>
          <!-- normal-case and whitespace-normal must be here since the table is setting it and if the whitespace-normal is set the break-words will not work -->
          <div class="flex items-center normal-case whitespace-normal">
            <span class="countdown">
              <span style="--value:{elapsedBetweenBlocks};">s</span>
            </span>
            <div class="dropdown dropdown-end">
              <!-- svelte-ignore a11y-label-has-associated-control -->
              <label tabindex="0" class="btn btn-circle btn-ghost btn-xs text-info">
                <!-- info button -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  class="w-4 h-4 stroke-current"
                  ><path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg
                >
              </label>
              <div tabindex="0" class="card compact dropdown-content shadow bg-base-200 rounded-box w-64">
                <div class="card-body">
                  <h2 class="card-title">Block production time</h2>
                  <p class="prose font-normal">
                    Target is {msToSec(slotDuration)}s. <br />
                    The green means the block is produces in target time, orange that it's either faster or slower
                  </p>
                </div>
              </div>
            </div>
          </div>
        </th>
      </tr>
    </thead>
    <tbody>
      {#each lastBlocks as { blockNumber, hash, twoBlocksTimeDiff }}
        <tr>
          <td>
            <a href="{makeBlockUrl(hash)}" target="_blank" class="link">
              <Digits digits="{blockNumber}" />
            </a>
          </td>
          <td>{hash}</td>
          <td>{@html showTimeVariant(twoBlocksTimeDiff)}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
