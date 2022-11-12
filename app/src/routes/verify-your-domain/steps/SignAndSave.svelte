<script lang="ts">
  import '@anagolay/types/augment-api';

  import { pallets } from '@anagolay/api';
  import {
    AnClaim,
    AnClaimType,
    AnExpirationType,
    AnSignatures,
    AnStatementData
  } from '@anagolay/types/augment-api';
  import { u8aToHex } from '@polkadot/util';
  import { head, isEmpty } from 'ramda';
  import { onMount } from 'svelte';

  import { chainStore } from '$src/appStore';
  import Code from '$src/components/base/Code.svelte';
  import TitleCard from '$src/components/base/TitleCard.svelte';
  import { notificationsStore } from '$src/components/notifications/store';
  import { polkadotAccountsStore, signViaExtension } from '$src/components/polkadot/store';

  import { calculateCid, mainStore, steps } from '../store';

  let waitingForVerificationEvent: boolean = true;

  async function subToEvents() {
    pallets.verification
      .listenForEvent('VerificationSuccessful')
      .once('VerificationSuccessful', async (d) => {
        const poe = await $chainStore.api.query.poe.proofIdsByVerificationContext(d.data.context);
        const poeDecoded: string[] = poe.toHuman() as unknown as string[];

        if (!isEmpty(poeDecoded)) {
          $mainStore.proofId = head(poeDecoded);
          waitingForVerificationEvent = false;
          $mainStore.canSaveStatement = true;
        } else {
          notificationsStore.add(`Proof doesn't exist!!!`);
        }
      });
  }

  async function saveStatement() {
    $mainStore.savingStatement = true;
    /**
     * We need to build a claim first
     */
    const claim: AnClaim = {
      poeId: $mainStore.proofId,
      // this
      proportion: {
        name: 'percentage',
        sign: '%',
        value: '100'
      },
      subjectId: $mainStore.proofId,
      holder: $polkadotAccountsStore.selectedAccount.address,
      issuer: $polkadotAccountsStore.selectedAccount.address, // for now they are one and the same, much easier, later remote-signer can help
      claimType: AnClaimType.OWNERSHIP,
      valid: {
        from: `${Date.now()}`,
        until: ''
      },
      expiration: {
        expirationType: AnExpirationType.FOREVER,
        value: ''
      },
      onExpiration: ''
    };

    const payload = $chainStore.api.createType('StatementsClaim', claim);
    const account = polkadotAccountsStore.selectedAccountAsKeyring();
    const hexPublicKey = u8aToHex(account.publicKey);

    const data = payload.toHex();

    const holderSignature = await signViaExtension($polkadotAccountsStore.selectedAccount.address, data);

    const sig = {
      sig: holderSignature,
      sigKey: `urn:substrate:${hexPublicKey}`,
      cid: await calculateCid(holderSignature)
    };

    const signatures: AnSignatures = {
      holder: sig,
      issuer: sig
    };

    const statement: AnStatementData = {
      signatures,
      claim
    };

    const b = await pallets.statements.saveOwnership(
      statement,
      $polkadotAccountsStore.selectedAccount.address,
      {
        signer: $mainStore.signer
      }
    );

    b.once('OwnershipCreated', (d) => {
      $mainStore.statement = d.data;
      $mainStore.statementCreated = true;
      $mainStore.savingStatement = false;
      if ($steps.currentStep < 6) {
        steps.gotoStep(6);
        setTimeout(() => {
          document.querySelector(`#step_${6}`).scrollIntoView({
            behavior: 'smooth'
          });
        }, 100);
      }
    });

    b.once('error', (error) => {
      console.error(error);
      notificationsStore.add(error.error.message, 'error');
      $mainStore.savingStatement = false;
    });
    b.once('finalized', () => {
      $mainStore.savingStatement = false;
    });
  }

  onMount(() => {
    if ($chainStore.api) {
      const unsub = subToEvents();
      return unsub;
    }
  });
</script>

<TitleCard title="Sign and Save" step={5}>
  <div class="flex flex-col">
    {#if waitingForVerificationEvent}
      <article class="w-full">
        <span class="w-full btn loading">Waiting for the verification event from the Anagolay.network</span>
      </article>
    {:else}
      <div class="flex flex-col gap-4">
        <article class="w-full prose lg:prose-xl">
          Clicking on the <bold>Save the statement</bold> button will ask you to sign the claim and then submit
          it to the Anagolay Network.
        </article>
        <div />

        <article class="w-full prose lg:prose-lg">
          <blockquote>
            I am Claiming that account <Code
              >{$polkadotAccountsStore.selectedAccount &&
                $polkadotAccountsStore.selectedAccount.address}</Code
            > owns the domain
            <a href="http://${$mainStore.domain}" target="_blank" rel="noopener noreferrer"
              >{$mainStore.domain}</a
            >
            in a proportion of <Code>100%</Code>!
          </blockquote>
        </article>
        <button
          class="btn btn-success {$mainStore.savingStatement && 'loading'}"
          disabled={$mainStore.statementCreated || $mainStore.savingStatement || !$mainStore.canSaveStatement}
          on:click={saveStatement}
        >
          Save the statement
        </button>
      </div>
    {/if}
  </div>
</TitleCard>
