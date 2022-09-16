<script lang="ts">
  import '@anagolay/types/augment-api';
  import TitleCard from '$src/components/base/TitleCard.svelte';
  import { calculateCid, mainStore, steps } from '../store';
  import { pallets, connectToWs, ApiPromise } from '@anagolay/api';
  import { onDestroy, onMount } from 'svelte';
  import { alerts } from '$src/components/notifications/stores';
  import {
    AnClaim,
    AnClaimType,
    AnForWhat,
    AnProofData,
    AnSignature,
    AnSignatures,
    AnStatementData,
  } from '@anagolay/types';
  import { web3FromAddress } from '@polkadot/extension-dapp?client';
  import { isNil, split, startsWith } from 'ramda';
  import Code from '$src/components/base/Code.svelte';
  import CodeBlockWithSerialization from '$src/components/base/CodeBlockWithSerialization.svelte';
  import { hexToString, stringToHex } from '@polkadot/util';

  const idPlaceholder = `__it's calculated on-chain using our workflow__`;

  let api: ApiPromise | undefined;
  let apiConnected: boolean = false;
  let savingProof: boolean = false;

  onMount(async () => {
    api = await connectToWs();
    apiConnected = api.isConnected;
    const [chain, nodeName, nodeVersion] = await Promise.all([
      api.rpc.system.chain(),
      api.rpc.system.name(),
      api.rpc.system.version(),
    ]);

    const proofData: AnProofData = {
      workflowId: 'bafkr4icijxzickvfhqfc4gef6exesry32rhyprv6piimbrigk37hagja3i',
      prevId: '',
      creator: $mainStore.account,
      groups: [AnForWhat.GENERIC],
      params: [
        { k: 'domain-verification-code', v: $mainStore.verificationCode },
        { k: 'domain', v: $mainStore.domain },
      ],
    };

    $mainStore.proof = {
      id: idPlaceholder,
      data: proofData,
    };
  });

  /**
   * A method that will find format and invoke the polkadotJs Dapp for signing an Proof extrinsic
   */
  async function createProof() {
    $mainStore.savingProof = true;
    /**
     * a dummy placeholder for the correct message
     */
    let proofHadErrors = false;
    web3FromAddress($mainStore.account)
      // import { InjectedExtension } from '@polkadot/extension-inject/types';
      .then(async (injector) => {
        const bc = await pallets.poe.save($mainStore.proof.data, $mainStore.account, {
          signer: injector.signer,
        });
        bc.on(pallets.poe.config.EVENT_NAME_SINGLE, (p) => {
          console.log(p);

          if (startsWith('poe.ProofCreated', p.message)) {
            const d = split('::')(p.message)[1];
            const eventRecord = JSON.parse(d);
            const proofId = hexToString(eventRecord[1]);
            $mainStore.proof = {
              ...$mainStore.proof,
              id: proofId,
            };
            alerts.add('Proof saved but not finalized.');
          }

          if (!isNil(p.error)) {
            console.error(p.error);
            alerts.add(p.error.message, 'error', { close: true, time: 5000 });
            $mainStore.savingProof = false;
            proofHadErrors = true;
          }
          // else {
          //   console.log('[poe:save]', p.message);
          // }
          if (p.finalized) {
            console.log('[poe:save:fin]', p);
            alerts.add('Proof saved and finalized.');
            $mainStore.savingProof = false;
            if (!proofHadErrors) {
              $mainStore.proofCreated = true;
              $mainStore.canSaveStatement = true;
            }
          }
        });

        // this is just an idea to listen to the events from the chain
        bc.on('ProofCreated', () => {});
      })
      .catch((error: Error) => {
        alerts.add(error.message, 'error', { close: true, time: 5000 });
        $mainStore.savingProof = false;
      });
  }

  /**
   * Save the statement to the chain
   */
  async function saveStatement() {
    $mainStore.savingStatement = true;
    /**
     * We need to build a claim first
     */
    const claim: AnClaim = {
      poeId: $mainStore.proof.id,
      workflowId: 'bafkr4icijxzickvfhqfc4gef6exesry32rhyprv6piimbrigk37hagja3i',
      proportion: {
        name: 'percentage',
        sign: '%',
        value: '100',
      },
      subjectId: $mainStore.proof.id,
      holder: $mainStore.account,
      issuer: $mainStore.account, // for now they are one and the same, much easier, later remote-signer can help
      claimType: AnClaimType.OWNERSHIP,
      valid: {
        from: `${Date.now()}`,
        until: undefined,
      },
      expiration: undefined,
      onExpiration: '',
    };

    const injector = await web3FromAddress($mainStore.account);
    // this injector object has a signer and a signRaw method
    // to be able to sign raw bytes
    const signRaw = injector?.signer?.signRaw;

    if (!!signRaw) {
      console.log(`Signing the claim`);
      // after making sure that signRaw is defined
      // we can use it to sign our message
      const { signature: holderSignature } = await signRaw({
        address: $mainStore.account,
        data: stringToHex(JSON.stringify(claim)),
        type: 'bytes',
      });

      const sig = {
        sig: holderSignature,
        sigKey: `urn:anagolay:${$mainStore.account}`,
        cid: await calculateCid(holderSignature),
      };

      const signatures: AnSignatures = {
        holder: sig,
        issuer: sig,
      };

      const statement: AnStatementData = {
        signatures,
        claim,
      };

      /**
       * a dummy placeholder for the correct message
       */
      let statementHadErrors = false;
      // here we start saving the statement
      web3FromAddress($mainStore.account)
        // import { InjectedExtension } from '@polkadot/extension-inject/types';
        .then(async (injector: { signer: any }) => {
          const bc = await pallets.statements.saveOwnership(statement, $mainStore.account, {
            signer: injector.signer,
          });

          bc.on(pallets.statements.config.EVENT_NAME_SINGLE, (p) => {
            console.log(p);

            if (startsWith('statements::OwnershipCreate', p.message)) {
              const d = split('::')(p.message)[1];
              const eventRecord = JSON.parse(d);
              const recordId = hexToString(eventRecord[1]);

              $mainStore.statement = {
                id: recordId,
                data: statement,
              };

              alerts.add('Statement saved but not finalized.');
            }

            if (!isNil(p.error)) {
              console.error(p.error);
              alerts.add(p.error.message, 'error', { close: true, time: 5000 });
              $mainStore.savingStatement = false;
              statementHadErrors = true;
            }
            if (p.finalized) {
              if (!statementHadErrors) {
                $mainStore.statementCreated = true;
                $mainStore.savingStatement = false;
                alerts.add('Statement saved and finalized.');
                if ($steps.currentStep < 6) {
                  steps.gotoStep(6);
                  setTimeout(() => {
                    document.querySelector(`#step_${6}`).scrollIntoView({
                      behavior: 'smooth',
                    });
                  }, 100);
                }
              }
            }
          });
        })
        .catch((error: Error) => {
          alerts.add(error.message, 'error', { close: true, time: 5000 });
          $mainStore.savingStatement = false;
        });
    }
  }
  // cleanup
  onDestroy(async () => {
    // await api.disconnect();
    // apiConnected = !apiConnected;
    // api = undefined;
  });
</script>

<TitleCard title="Sign and Save" step={5}>
  <div class="flex flex-col">
    <div class="flex flex-col gap-4">
      <article class="w-full prose lg:prose-xl">
        First we need to create a Proof of domain ownership on-chain so we can include it in the Claim. You
        can read more on the Proofs <a
          href="https://anagolay.dev/about/proof-of-existence/ "
          target="_blank"
          rel="noopener noreferrer">here</a
        >
      </article>
      <TitleCard title="Proof Structure" hideContent={true} class="p-0">
        <CodeBlockWithSerialization code={$mainStore.proof} />
      </TitleCard>
      <!-- save the proof button -->
      <button
        class="btn btn-outline btn-accent {$mainStore.savingProof && 'loading'}"
        disabled={!apiConnected || $mainStore.savingProof || $mainStore.proofCreated}
        on:click={createProof}>First save the Proof</button
      >
    </div>
    <div class="divider">THEN</div>
    <div class="flex flex-col gap-4">
      <article class="w-full prose lg:prose-xl">
        Clicking on the <bold>Save the statement</bold> button will ask you to sign the claim and then submit it
        to the Anagolay Network.
      </article>
      <div />

      <article class="w-full prose lg:prose-lg">
        <blockquote>
          I am Claiming that account <Code>{$mainStore.account}</Code> owns the domain
          <a href="http://${$mainStore.domain}" target="_blank" rel="noopener noreferrer"
            >{$mainStore.domain}</a
          >
          in a proportion of <Code>100%</Code>!
        </blockquote>
      </article>
      <button
        class="btn btn-success {$mainStore.savingStatement && 'loading'}"
        disabled={$mainStore.savingStatement || !$mainStore.canSaveStatement}
        on:click={saveStatement}
      >
        Save the statement
      </button>
    </div>
  </div>
</TitleCard>
