<script lang="ts">
import Identicon from 'identicon.js';
import { isEmpty, takeLast, take, compose, any, includes, values, isNil, filter } from 'ramda';
import type { IdenticonOptions } from 'identicon.js';
import { equals } from 'ramda';
import { polkadotAccountsStore } from '../store';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import { notifications } from '$src/components/notifications/stores';
import { fade } from 'svelte/transition';

let classNames: string = '';
export { classNames as class };

const identiconOptions: IdenticonOptions = {
	foreground: [0, 0, 0, 255], // rgba black
	background: [255, 255, 255, 255], // rgba white
	margin: 0.1, // 20% margin
	size: 500, // 420px square
	format: 'png' // use PNG instead of SVG
};

// we will use this to filter the list
let localAccounts: InjectedAccountWithMeta[] = [];

let locallySelectedAddress: InjectedAccountWithMeta | undefined;

// default identicon
let avatarIconImageBase64String: any = new Identicon(
	'default-text-for-our-identicon',
	identiconOptions
).toString();

/**
 * Truncate the address showing first X and last Y joined with the `...`
 * @param address
 */
function truncateAddress(address: string): string | boolean {
	if (isNil(address) || isEmpty(address)) {
		return false;
	}
	// take first 7
	const start = take(7, address);

	// and take last 7
	const end = takeLast(7, address);

	return `${start}...${end}`;
}

function makeAvatarIcon(data: string): string {
	const identiconImage = new Identicon(data, identiconOptions).toString();
	return identiconImage;
}

/**
 * Copy the string to the clipboard
 * #_REWRITE
 * @param address
 */
async function copyToClipboard(address: string) {
	await navigator.clipboard.writeText(address);
	notifications.addNew({
		text: 'Address copied.'
	});
}

/**
 * basic search function
 * @param e
 */
function makeSearch(e: any) {
	const v: string = e.target.value;
	if (isEmpty(v)) {
		// restore
		localAccounts = $polkadotAccountsStore.injectedAccounts;
	} else {
		const filtered = $polkadotAccountsStore.injectedAccounts.filter((a) => {
			return a.meta.name.includes(v);
		});
		localAccounts = filtered;
	}
}

$: {
	if (!isNil($polkadotAccountsStore.selectedAccount) && !isEmpty($polkadotAccountsStore.selectedAccount)) {
		avatarIconImageBase64String = makeAvatarIcon($polkadotAccountsStore.selectedAccount.address);
		locallySelectedAddress = $polkadotAccountsStore.selectedAccount;
	}

	localAccounts = $polkadotAccountsStore.injectedAccounts;
}
</script>

<div class="dropdown  {classNames}">
	<div class="flex items-center gap-2">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label tabindex="0" class="btn btn-ghost btn-circle avatar">
			<img class="rounded-full" alt="Identicon" src="data:image/png;base64,{avatarIconImageBase64String}" />
		</label>
		<div class="max-w-[12rem]">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label tabindex="0" class="cursor-pointer">
				{#if locallySelectedAddress}
					<p class="truncate">{locallySelectedAddress.meta.name}</p>
				{:else}
					Select the account.
				{/if}
			</label>
		</div>
	</div>

	<div class="dropdown-content bg-base-200 mt-3 p-2 shadow-lg drop-shadow-lg w-full md:w-96">
		<!-- svelte-ignore a11y-autofocus -->
		<input
			type="search"
			placeholder="Filter accounts..."
			class="input w-full mb-2"
			on:input="{(e) => makeSearch(e)}" />

		<ul tabindex="0" class="menu menu-compact gap-2">
			{#if !isEmpty(localAccounts)}
				{#each localAccounts as account}
					<li class="shadow">
						<div
							transition:fade="{{ delay: 250, duration: 300 }}"
							class="flex flex-row {!isNil(locallySelectedAddress) &&
								equals(account.address, locallySelectedAddress.address) &&
								'active'}">
							<button
								class="btn btn-ghost btn-circle avatar"
								on:click="{() => copyToClipboard(account.address)}">
								<img
									class="rounded-full"
									alt="Identicon"
									src="data:image/png;base64,{makeAvatarIcon(account.address)}" />
							</button>
							<span
								class="flex flex-col justify-start items-start w-full"
								on:click="{() => {
									polkadotAccountsStore.setSelectedAccount(account);
								}}">
								<span class="text-lg">{account.meta.name}</span>
								<span class="text-2xs">{truncateAddress(account.address)}</span>
							</span>
						</div>
					</li>
				{/each}
			{/if}
		</ul>
	</div>
</div>
