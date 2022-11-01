<script context="module" lang="ts">
export const prerender = true;

import Debugger, { type Debugger as DebuggerType } from 'debug';

export const debugName: string = 'pages:workflowBuilder';

const debug: DebuggerType = Debugger(debugName);
</script>

<script script lang="ts">
import { page } from '$app/stores';
import Code from '$src/components/base/CodeBlockWithSerialization.svelte';
import SkeletonLoader from '$src/components/base/SkeletonLoader.svelte';
import { notifications } from '$src/components/notifications/stores';
import {
	chainConnected,
	chainStore,
	pageTitle,
	relayServiceWSS,
	showSidebar,
	websocketRelayConnected
} from '$src/appStore';
import { serializeThenParse } from '$src/utils/json';
import { getHashValue } from '$src/utils/url';

import { AnForWhat, type AnOperation, type AnOperationVersion } from '@anagolay/types';
import { isEmpty } from 'ramda';
import slug from 'slug';
import { io, Socket } from 'socket.io-client';
import { onMount } from 'svelte';
import SvelteSeo from 'svelte-seo';
import Drawflow from './drawflow.svelte';
import OperationNode from './OperationNode.svelte';
import { workflow } from './stores';
import { IOperationWithVersions, pallets } from '@anagolay/api';

// we don't want sidebar here
showSidebar.set(false);

const title: string = 'Workflow builder';

pageTitle.set(title);

/**
 * A value which we will sluggify and then add to the store value `$workflow.manifestData.name`.
 * This acts as a package name, so choose wisely
 */
let workflowName: string = '';

/**
 * This is how we build the actual VALUES! i had to change the output of the types to be ES2020
 */
const groupsAll = Object.entries(AnForWhat);

const Groups: { id: number; name: string }[] = groupsAll
	// check the console.log(groupsAll) for the reason why slice and divide by 2
	.slice(groupsAll.length / 2, groupsAll.length)
	.map((g) => {
		return {
			id: g[1] as number,
			name: g[0]
		};
	});

let socket: Socket;

let saveDisabled: boolean = true;

/**
 * Send the Manifest to WS.
 *
 * @remarks
 * The commented code lines are left like this intentionally.
 */
function sendMessageToWs() {
	saveDisabled = true;
	notifications.add('Workflow data sent to WS, please check the CLI.', 'success', {
		close: false
	});

	// The serialization of the Map is not natively  supported. When we serialize we use the replacer and wnen parse we use the reviver

	const workflowBuild = serializeThenParse($workflow);

	socket.emit('continueWithWorkflow', workflowBuild);

	socket.disconnect();
}

function cancelTheCreation() {
	notifications.add('Workflow canceled', 'warning');
	socket.emit('cancelWorkflowBuilding', {});
	socket.disconnect();
}

/**
 * Namespace to connect to. This is the shared namespace between this app and CLI
 */
let namespace: string = getHashValue($page.url.hash, 'ns', $workflow.manifestData.name);

/**
 * Websocket server address without the client path.
 */
let ws: string = getHashValue($page.url.hash, 'ws', $relayServiceWSS);

/**
 * This is the path where to get the socket.io client library
 * https://socket.io/docs/v4/client-options/#path
 */
let path: string = '/' + getHashValue($page.url.hash, 'path', 'ws');

// Operations with their respective versions from the chain
let operationsWithVersions: IOperationWithVersions[] = [];

// add the node to the drawer
function addNode(op: AnOperation, versions: AnOperationVersion[]) {
	bindedDf.addNode(op, versions);
}

async function run() {
	// @TODO pagination ui
	operationsWithVersions = await pallets.operations.retrieveOperationsPaged(0, 10);
}

/**
 * On the Component mount
 */
onMount(async () => {
	// initial name is the namespace to connect to
	workflowName = namespace;

	socket = io(ws + '/' + namespace, {
		path,
		reconnection: true,
		transports: ['websocket'],
		secure: true
	});

	socket.on('connect', () => {
		debug('WS:: connected with id %s and namespace %s', socket.id, namespace);
		websocketRelayConnected.set(true);
	});

	socket.on('disconnect', () => {
		websocketRelayConnected.set(false);
	});

	socket.on('connect_error', () => {
		console.error('socket error');
		socket.connect();
	});
});

// Bind the drawFlow.svelte to this bariable so we can use it
let bindedDf: Drawflow;

/**
 * Opens the Operarion Info modal window
 * @param id
 */
function showOperationInfo(id: string) {
	console.log('operation version ID is %s', id);
	console.log('this should open the modal');
}

// make check when wen can enable save button
$: {
	const { segments, groups, name, description } = $workflow.manifestData;
	saveDisabled = true;
	if (groups.length > 0 && name.length > 7 && description.length > 7 && segments.length > 0) {
		const heads = segments.filter((s) => s.inputs.every((i) => i == -1));
		const firstSegment = segments[0];
		if (heads.length == 1 && firstSegment.inputs.includes(-1) && firstSegment.sequence.length > 0) {
			saveDisabled = false;
		}
	}
}

/**
 * Listen for the changes and then slug the name
 */
$: $workflow.manifestData.name = slug(workflowName, '_');
$: {
	if ($chainConnected) {
		run();
	}
}
</script>

<SvelteSeo title="{title}" description="Workflow creation page. The most fun you had in years!" />

<div class="flex flex-row">
	<aside
		class="w-64 lg:shadow transform -translate-x-full md:translate-x-0 transition-transform duration-150 ease-in bg-base-content">
		<!-- The button to open modal -->
		<div class="p-4">
			<label for="manifest-modal" class="btn modal-button btn-accent w-full">Show Manifest</label>
		</div>

		<div class="px-4 my-2 min-h-12">
			<h2 class="text-base-300">Operations:</h2>
			<ul class="flex flex-col w-full">
				{#await operationsWithVersions}
					<li>
						<SkeletonLoader />
					</li>
				{:then opvs}
					{#if isEmpty(opvs)}
						<span class="label-text text-base-300">Nothing found. Please publish few Operations.</span>
					{/if}
					{#each opvs as opv}
						<li>
							<OperationNode opv="{opv}" addNode="{addNode}" showOperationInfo="{showOperationInfo}" />
						</li>
					{/each}
				{:catch error}
					<p class="text-red-900">${error.message}</p>
				{/await}
			</ul>
		</div>
		<div class="h-fit">
			<div class="form-control px-4">
				<div>
					<label class="label" for="workflowName">
						<span class="label-text text-base-300">Name</span>
					</label>
					<input
						type="text"
						name="workflowName"
						bind:value="{workflowName}"
						class="input bg-slate-200 input-bordered w-full max-w-xs text-slate-800 focus:text-slate-100 focus:bg-primary-focus" />
				</div>
				<div>
					<label class="label" for="workflowDesc">
						<span class="label-text text-base-300">Description</span>
					</label>
					<input
						type="text"
						name="workflowDesc"
						bind:value="{$workflow.manifestData.description}"
						class="input bg-slate-200 input-bordered w-full max-w-xs text-slate-800 focus:text-slate-100  focus:bg-primary-focus" />
				</div>

				<div>
					<label class="label" for="groups">
						<span class="label-text text-base-300">Groups</span>
					</label>

					<div class="bg-slate-200 rounded-lg px-2 py-2">
						{#each Groups as group}
							<div class="form-control py-0 px-0">
								<label class="label cursor-pointer">
									<span class="label-text text-black">{group.name}</span>
									<input
										bind:group="{$workflow.manifestData.groups}"
										type="checkbox"
										name="groups"
										class="checkbox outline checkbox-primary"
										value="{group.name}" />
								</label>
							</div>
						{/each}
					</div>
				</div>
			</div>
			<div class="px-4 py-6 btn-group w-full bottom-0">
				<button
					disabled="{saveDisabled}"
					on:click="{sendMessageToWs}"
					class="btn w-1/2 btn-primary  disabled:text-slate-500">Save</button>
				<button on:click="{cancelTheCreation}" class="btn w-1/2 btn-error">Cancel</button>
			</div>
		</div>
	</aside>

	<main class="flex flex-col flex-grow -ml-64 md:ml-0">
		<Drawflow bind:this="{bindedDf}" />
		<div class="modalWindow p-4">
			<input type="checkbox" id="manifest-modal" class="modal-toggle" />
			<label for="manifest-modal" class="modal cursor-pointer">
				<div class="modal-box w-11/12 max-w-5xl">
					<label for="manifest-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

					<Code
						code="{JSON.parse(
							JSON.stringify($workflow.manifestData, (key, value) => {
								// @TODO here, again we need to serialize the object to JSON without alteration of the model
								// serializeAndParse() cannot work here
								if (value instanceof Map) {
									return Object.fromEntries(value);
								} else {
									return value;
								}
							})
						)}" />
				</div>
			</label>
		</div>
	</main>
</div>
<!-- 
<style>
  .dim-screen {
    position: fixed;
    padding: 0;
    margin: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.5);
    z-index: 1000;
    backdrop-filter: blur(5px);
  }
</style> -->
