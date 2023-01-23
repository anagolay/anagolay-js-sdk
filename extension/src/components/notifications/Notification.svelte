<script lang="ts">
import { fade } from 'svelte/transition';
import { Icon } from 'svelte-awesome';
import cancel from 'svelte-awesome/icons/close';

import Circle from '../spinners/Circle.svelte';
import type { INotification } from './store';

let classNames: string = '';
export { classNames as class };

export let infoLevel: 'info' | 'success' | 'warning' | 'error' | '' = '';

export let data: INotification;

let notificationsCss: string;

$: notificationsCss = infoLevel !== '' ? `alert-${infoLevel}` : '';
</script>

{#if infoLevel === ''}
  <div
    class="alert shadow-lg fixed w-fit bottom-7 right-7 {classNames} flex flex-row justify-center items-center"
    transition:fade
  >
    <div>
      {#if data.showSpinner}
        <Circle />
      {/if}
      <span>{data.text}</span>
    </div>
    {#if !data.showSpinner}
      <button class="btn btn-ghost btn-sm" on:click="{data.closeFn}">
        <Icon data="{cancel}" />
      </button>
    {/if}
  </div>
{:else if infoLevel === 'info'}
  <div
    class="alert alert-info shadow-lg fixed w-fit bottom-7 right-7 {classNames} flex flex-row justify-center items-center"
    transition:fade
  >
    <div>
      {#if data.showSpinner}
        <Circle />
      {/if}
      <span>{data.text}</span>
    </div>
    {#if !data.showSpinner}
      <button class="btn btn-ghost btn-sm" on:click="{data.closeFn}">
        <Icon data="{cancel}" />
      </button>
    {/if}
  </div>
{:else if infoLevel === 'warning'}
  <div
    class="alert alert-warning shadow-lg fixed w-fit bottom-7 right-7 {classNames} flex flex-row justify-center items-center"
    transition:fade
  >
    <div>
      {#if data.showSpinner}
        <Circle />
      {/if}
      <span>{data.text}</span>
    </div>
    {#if !data.showSpinner}
      <button class="btn btn-ghost btn-sm" on:click="{data.closeFn}">
        <Icon data="{cancel}" />
      </button>
    {/if}
  </div>
{:else if infoLevel === 'success'}
  <div
    class="alert {notificationsCss} alert-success shadow-lg fixed w-fit bottom-7 right-7 {classNames} flex flex-row justify-center items-center"
    transition:fade
  >
    <div>
      {#if data.showSpinner}
        <Circle />
      {/if}
      <span>{data.text}</span>
    </div>
    {#if !data.showSpinner}
      <button class="btn btn-ghost btn-sm" on:click="{data.closeFn}">
        <Icon data="{cancel}" />
      </button>
    {/if}
  </div>
{:else if infoLevel === 'error'}
  <div
    class="alert {notificationsCss} alert-error shadow-lg fixed w-fit bottom-7 right-7 {classNames} flex flex-row justify-center items-center "
    transition:fade
  >
    <div>
      {#if data.showSpinner}
        <Circle />
      {/if}
      <span>{data.text}</span>
    </div>
    {#if !data.showSpinner}
      <button class="btn btn-ghost btn-sm" on:click="{data.closeFn}">
        <Icon data="{cancel}" />
      </button>
    {/if}
  </div>
{/if}
