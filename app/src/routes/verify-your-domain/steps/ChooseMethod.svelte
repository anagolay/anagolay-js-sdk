<script lang="ts">
import Code from '$src/components/base/Code.svelte';

import TitleCard from '$src/components/base/TitleCard.svelte';
import { notifications } from '$src/components/notifications/stores';
import { txtRecords, type IDoHResponse, type IDoHAnswer } from '@anagolay/util';
import { equals, filter, includes, isEmpty, isNil, length } from 'ramda';
import { find } from 'remeda';

import { mainStore, steps } from '../store';

let selectedMethod: 'dns' | 'well-known' = 'dns';
let verificationOnGoing: boolean = false;

async function verifyDomainDNS() {
  verificationOnGoing = true;
  // it's too fast, slow it down for the better effect
  setTimeout(async () => {
    const resp: IDoHResponse = await txtRecords($mainStore.domain, 'https://dns.google/resolve');

    const Answer = resp.Answer as IDoHAnswer[];

    console.log('Answer', Answer);

    if (isNil(Answer) || isEmpty(Answer)) {
      verificationOnGoing = false;
      notifications.add(
        `Cannot verify, try again in few minutes. It's normal that the DNS propagation takes up to 48h. When you want, close this message and try again.`,
        'warning',
        { close: false }
      );
      return;
    }

    const anagolayAnswerForDifferentAccount: IDoHAnswer = filter(
      (n: IDoHAnswer) => includes('anagolay-domain-verification')(n.data),
      Answer as IDoHAnswer
    );

    console.log('anagolayAnswerForDifferentAccount', anagolayAnswerForDifferentAccount);

    // this causes a bug
    if (length(anagolayAnswerForDifferentAccount) > 1) {
      verificationOnGoing = false;
      notifications.add(`Cannot verify, the ownership is already claimed by someone else!`, 'error');
      return;
    }

    const anagolayAnswer: IDoHAnswer = find(anagolayAnswerForDifferentAccount, (i) =>
      includes($mainStore.verificationCode)(i.data)
    );

    if (!isNil(anagolayAnswer) && !isEmpty(anagolayAnswer)) {
      const { data } = anagolayAnswer;
      // this is required becuase the TXT record gets surrounded by double quotes like
      // '"anagolay-domain-verification=asdsdasdasdsaasweewq"'
      // const cleanData = replace(/\"/g, '', data);

      // if (equals(cleanData, $mainStore.verificationCode)) {
      steps.gotoStep(5);
      setTimeout(() => {
        document.querySelector(`#step_${5}`).scrollIntoView({
          behavior: 'smooth'
        });
      }, 100);
      // } else {
      // alerts.add(`Cannot verify, the ownership is already claimed`, 'error');
      // }
    } else {
      notifications.add(
        `Cannot verify, try again in few minutes. It's normal that the DNS propagation takes up to 48h. When you want, close this message and try again.`,
        'warning',
        { close: false }
      );
    }

    verificationOnGoing = false;
  }, 1000);
}
</script>

<TitleCard title="Choose verification method" step="{4}">
  <div class="flex w-full">
    <div class="grid h-20 flex-grow card bg-base-300 rounded-box place-items-center">
      <div class="form-control">
        <label class="label cursor-pointer">
          <span class="btn mr-4">dns txt</span>
          <input
            type="radio"
            value="dns"
            name="dns"
            class="radio radio-primary"
            bind:group="{selectedMethod}"
          />
        </label>
      </div>
    </div>
    <div class="divider divider-horizontal">OR</div>
    <div class="grid h-20 flex-grow card bg-base-300 rounded-box place-items-center">
      <label class="label cursor-pointer">
        <span class="btn mr-4">.well-known</span>
        <input
          bind:group="{selectedMethod}"
          type="radio"
          value="well-known"
          name="well-known"
          class="radio radio-primary"
        />
      </label>
    </div>
  </div>

  {#if equals(selectedMethod, 'dns')}
    <div class="flex flex-col gap-4 p-4">
      <div class="w-full prose lg:prose-xl">
        To continue verification process you have to add the TXT records to your DNS. Here are few links from
        popular domain registries to help you started:
        <ul>
          <li>
            <a
              href="https://www.namecheap.com/support/knowledgebase/article.aspx/317/2237/how-do-i-add-txtspfdkimdmarc-records-for-my-domain/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Namecheap</a
            >
          </li>
          <li>
            <a
              href="https://docs.hetzner.com/dns-console/dns/general/getting-started-dns/#create-a-dns-record"
              target="_blank"
              rel="noopener noreferrer">Hetzner</a
            >
          </li>
          <li>
            <a
              href="https://www.cloudflare.com/learning/dns/dns-records/dns-txt-record/"
              target="_blank"
              rel="noopener noreferrer">Cloudflare</a
            >
          </li>
        </ul>
      </div>
      <div class="flex flex-col gap-4">
        <div class="flex flex-row justify-between w-full items-center">
          <h1 class="">Type:</h1>
          <Code class="p-4">TXT</Code>
        </div>
        <div class="flex flex-row justify-between w-full items-center">
          <h1 class="">Host (Name):</h1>
          <Code class="p-4">@</Code>
        </div>
        <div class="flex flex-row justify-between w-full items-center flex-wrap">
          <h1 class="">Value (Content):</h1>
          <Code class="p-4">{$mainStore.verificationCode}</Code>
        </div>
      </div>

      <button
        class="btn btn-primary {verificationOnGoing && 'loading'}"
        disabled="{verificationOnGoing || $mainStore.savingProof || $mainStore.proofCreated}"
        on:click="{verifyDomainDNS}"
      >
        I have updated the DNS. Please Verify
      </button>
    </div>
  {/if}
  {#if equals(selectedMethod, 'well-known')}
    <div>.well-known is not yet implemented</div>
  {/if}
</TitleCard>
