import { AnProof, AnStatement } from '@anagolay/types';
import init, { Workflow } from 'wf_cidv1_from_array';
import wasm from 'wf_cidv1_from_array/wf_cidv1_from_array_bg.wasm?url';
// import { Buffer } from 'buffer';
import { equals, isNil, last } from 'ramda';
import { get, writable } from 'svelte/store';

import type { IDoHResponse } from '@anagolay/utils/doh';

console.time('[an-wf:wasm-init]');
init(wasm).then(console.debug).catch(console.error);
console.timeEnd('[an-wf:wasm-init]');

/**
 * A simple wrapper for Anagolay CID Workflow that is using the TextEncoder to create a Uint8Array, optimized for the Web. It also init the wasm
 * @param data - Any string
 * @returns
 */
export async function calculateCid(data: string): Promise<string> {
  /**
   * Here we create our workflow and calc the cid in ~1 ms
   */
  const start = new Date().getTime();
  const wf = new Workflow();

  const te = new TextEncoder();
  const input = te.encode(data);
  const { output } = await wf.next([input]);
  const elapsedTime = new Date().getTime() - start + ' ms';
  console.log('cid calculation: %s -> %s', output, elapsedTime);

  return output;
}

/**
 * Step interface
 */
interface Step {
  id: number;
  title: string;
  class: string;
}

interface MainStoreRecords {
  domain: string;
  account: string;
  verifyMethod: 'dns' | 'well-known' | undefined;
  verificationCode: string;
  doh: IDoHResponse | undefined;
  proof: AnProof | undefined;
  proofCreated: boolean;
  savingProof: boolean;
  statement: AnStatement | undefined;
  savingStatement: boolean;
  statementCreated: boolean;
  canSaveStatement: boolean;
  domainVerified: boolean;
}
function mainStoreFn() {
  const defaultState: MainStoreRecords = {
    domain: undefined,
    account: undefined,
    verifyMethod: 'dns',
    verificationCode: undefined,
    doh: undefined,
    proof: undefined,
    proofCreated: false,
    canSaveStatement: false,
    savingProof: false,
    savingStatement: false,
    statement: undefined,
    domainVerified: false,
    statementCreated: false,
  };
  const { update, subscribe, set } = writable<MainStoreRecords>(defaultState);
  return {
    subscribe,
    set,
    update,
    reset: () => set(defaultState),
    resetProof: () =>
      update((curState: MainStoreRecords) => {
        return { ...curState, proof: undefined, proofCreated: undefined };
      }),
    calculateIdentifier: async () => {
      const curState = get(mainStore);
      if (!isNil(curState.domain) && !isNil(curState.account)) {
        /**
         * Identifier is the domain name with tld + the account that is claiming it
         */
        const identifier = [curState.domain, curState.account];

        // initialize wasm manually because the vite doesn't do it for us

        const cid = await calculateCid(identifier.join('||'));

        const verificationCode = `anagolay-domain-verification=${cid}`;
        // console.log({ verificationCode, cid, identifier });
        update((curState: MainStoreRecords) => {
          return { ...curState, verificationCode };
        });
      }
    },
  };
}

/**
 * Main store for this route
 */
export const mainStore = mainStoreFn();

function stepsFn() {
  const steps: Step[] = [
    {
      id: 1,
      title: 'Load accounts',
      class: 'step-primary',
    },
    {
      id: 2,
      title: 'Choose account',
      class: '',
    },
    {
      id: 3,
      title: 'Add domain',
      class: '',
    },
    {
      id: 4,
      title: 'Choose verification method',
      class: '',
    },
    {
      id: 5,
      title: 'Sign and Save',
      class: '',
    },
    {
      id: 6,
      title: 'DONE!!',
      class: '',
    },
  ];
  const { update, subscribe, set } = writable<{ steps: Step[]; currentStep: number }>({
    currentStep: 1,
    steps,
  });
  return {
    subscribe,
    set,
    gotoStep: (stepId: number) => {
      update((curState) => {
        console.debug('triggered for step %s previous %s', stepId, curState.currentStep);
        curState.steps.map((s) => {
          if (s.id < stepId) {
            s.class = 'step-success';
          }
          if (equals(s.id, stepId)) {
            s.class = 'step-primary';
            curState.currentStep = s.id;
          }
          if (equals(s.id, stepId) && last(steps).id === stepId) {
            s.class = 'step-success';
            curState.currentStep = s.id;
          }
        });
        return curState;
      });
    },
  };
}

/**
 * Steps store
 */
export const steps = stepsFn();
