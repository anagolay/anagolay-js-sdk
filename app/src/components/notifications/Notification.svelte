<script lang="ts">
import MaterialIcon from '$src/components/base/MaterialIcon.svelte';
import type { INotification } from './stores';
import { fade } from 'svelte/transition';
import CircleSpinner from '../base/Spinners/Circle.svelte';

let classNames: string = '';
export { classNames as class };

export let infoLevel: 'info' | 'success' | 'warning' | 'error' | '' = '';

export let data: INotification;

let disableButton: boolean = false;

let notificationsCss: string;

$: notificationsCss = infoLevel !== '' ? `alert-${infoLevel}` : '';
$: disableButton = data.showSpinner;
</script>

{#if infoLevel === ''}
	<div class="alert shadow-lg fixed w-fit bottom-7 right-7 {classNames}" transition:fade>
		<div>
			{#if data.showSpinner}
				<CircleSpinner />
			{/if}
			<span>{data.text}</span>
		</div>
		{#if !data.showSpinner}
			<button on:click="{data.closeFn}">
				<MaterialIcon iconName="cancel" />
			</button>
		{/if}
	</div>
{:else if infoLevel === 'info'}
	<div class="alert alert-info shadow-lg fixed w-fit bottom-7 right-7 {classNames}" transition:fade>
		<div>
			{#if data.showSpinner}
				<CircleSpinner />
			{/if}
			<span>{data.text}</span>
		</div>
		{#if !data.showSpinner}
			<button on:click="{data.closeFn}">
				<MaterialIcon iconName="cancel" />
			</button>
		{/if}
	</div>
{:else if infoLevel === 'warning'}
	<div class="alert alert-warning shadow-lg fixed w-fit bottom-7 right-7 {classNames}" transition:fade>
		<div>
			{#if data.showSpinner}
				<CircleSpinner />
			{/if}
			<span>{data.text}</span>
		</div>
		{#if !data.showSpinner}
			<button on:click="{data.closeFn}">
				<MaterialIcon iconName="cancel" />
			</button>
		{/if}
	</div>
{:else if infoLevel === 'success'}
	<div
		class="alert {notificationsCss} alert-success shadow-lg fixed w-fit bottom-7 right-7 {classNames}"
		transition:fade>
		<div>
			{#if data.showSpinner}
				<CircleSpinner />
			{/if}
			<span>{data.text}</span>
		</div>
		{#if !data.showSpinner}
			<button on:click="{data.closeFn}">
				<MaterialIcon iconName="cancel" />
			</button>
		{/if}
	</div>
{:else if infoLevel === 'error'}
	<div
		class="alert {notificationsCss} alert-error shadow-lg fixed w-fit bottom-7 right-7 {classNames}"
		transition:fade>
		<div>
			{#if data.showSpinner}
				<CircleSpinner />
			{/if}
			<span>{data.text}</span>
		</div>
		{#if !data.showSpinner}
			<button on:click="{data.closeFn}">
				<MaterialIcon iconName="cancel" />
			</button>
		{/if}
	</div>
{/if}
