import { ApiPromise } from '@polkadot/api';
import { KeyringPair } from '@polkadot/keyring/types';
import { hexToString } from '@polkadot/util';
import { Rule } from '../../interfaces';

/**
 * Create Claim Proof TX
 * @param api
 * @param signer
 * @param params
 */
export function createClaimTX(
  api: ApiPromise,
  signer: KeyringPair,
  params: { proof: string; ruleId: string; payload: string },
): Promise<void> {
  const { proof, ruleId, payload } = params;
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    console.log(`\nCreating TX for the PoE : ${proof}`);

    await api.tx.poeModule
      .createClaim(proof, ruleId, payload)
      .signAndSend(signer, {}, ({ events = [], status, isError }) => {
        console.log(`\tTransaction status: ${status.type}`);

        if (status.isInBlock) {
          console.log('\tIncluded at block hash', status.asInBlock.toHex());

          console.log('\tEvents: ', events.length);

          events.forEach(({ event, phase }) => {
            const { data, method, section } = event;
            const [error] = data;

            // console.log('\t', phase.toString(), `: ${section}.${method}`, data.toString());
            // console.log('\t', phase.toString(), `: ${section}.${method}`);

            if (error.isModule) {
              const {
                documentation,
                name,
                section,
              } = api.registry.findMetaError(error.asModule);
              console.error('\t', documentation.toString(), name, section);
              console.error('\tRejecting ...');

              // reject here would make all the other promises to fail
              // reject('ExtrinsicFailed');
              resolve();
            } else {
              console.log(
                '\t',
                phase.toString(),
                `: ${section}.${method}`,
                data.toString(),
              );
            }
          });
        } else if (status.isFinalized) {
          console.log('\tFinalized block hash', status.asFinalized.toHex());

          resolve();
        } else if (isError) {
          console.error(status);
        }

        // console.log(
        //   `Rule created for ${ForWhat[r.forWhat]}\n hash: ${createdRuleSimple.toHex()}\n cid: ${hexToString(ruleId)}`,
        // );
      })
      .catch(reject);
  });
}

/**
 * Create Rule Transaction
 * @param api
 * @param param1
 * @param signer
 */
export async function saveRuleToBlockchain(
  api: ApiPromise,
  { payload, ruleId }: { ruleId: string; payload: Rule },
  signer: KeyringPair,
): Promise<void> {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise((resolve, reject) => {
    console.log(`\nCreating TX for the ruleId: ${ruleId}`);
    const unsub = api.tx.poe
      .createRule(ruleId, payload)
      .signAndSend(signer, {}, ({ events = [], status, isError }) => {
        console.log(`\tTransaction status:${status.type}`);

        if (status.isInBlock) {
          console.log('\tIncluded at block hash', status.asInBlock.toHex());

          console.log('\tEvents:', events.length);

          events.forEach(({ event, phase }) => {
            const { data, method, section } = event;
            const [error] = data;

            // console.log('\t', phase.toString(), `: ${section}.${method}`, data.toString());
            // console.log('\t', phase.toString(), `: ${section}.${method}`);

            if (error.isModule) {
              const {
                documentation,
                name,
                section,
              } = api.registry.findMetaError(error.asModule);
              console.error('\t', documentation.toString(), name, section);
              console.error('\tRejecting ...');

              // reject here would make all the other promises to fail
              // reject('ExtrinsicFailed');

              resolve();
            } else {
              console.log(
                '\t',
                phase.toString(),
                `: ${section}.${method}`,
                data.toString(),
              );
              resolve();
            }
          });
        } else if (status.isFinalized) {
          console.log('\tFinalized block hash', status.asFinalized.toHex());
        } else if (isError) {
          console.error(status);
        }

        // console.log(
        //   `Rule created for ${ForWhat[r.forWhat]}\n hash: ${createdRuleSimple.toHex()}\n cid: ${hexToString(ruleId)}`,
        // );
      })
      .catch(reject);
  });
}

export interface RuleInternalPayload {
  rule: Rule;
  ruleId: string;
  accountId: string;
  blockNumber: number;
}
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function getRules(
  api: ApiPromise,
  extended = false,
): Promise<RuleInternalPayload[]> {
  const c = await api.query.poe.rules.entries();
  console.log(`FOUND ${c.length} rules`);

  return c.map(([key, val]) => {
    const [ruleId, payload, accountId, blockNumber] = val;
    // if (extended) {
    //   console.log('KEY: ', key.args[0].toHex()); // this is the hash of the ruleID
    //   // console.log('VALUE: ', JSON.parse(hexToString(payload.toHex())));
    //   console.log('ACCOUNT ID: ', accountId.toString());
    //   console.log('BLOCK_NUMBER: ', blockNumber.toNumber());
    // }
    // must hexToString to get the decoded value
    return {
      rule: payload,
      ruleId: ruleId.toString(),
      accountId: accountId.toString(),
      blockNumber: blockNumber.toNumber(),
    };
  });
}

interface ProofInternalPayload {
  proof: Rule;
  proofId: string;
}
/**
 *
 * @param api
 * @param extended
 */
export async function getProofs(
  api: ApiPromise,
  extended = false,
): Promise<ProofInternalPayload[]> {
  const c = await api.query.poe.proofs.entries();

  console.log(`FOUND ${c.length} proofs`);

  let proofs: ProofInternalPayload[] = [];

  proofs = c.map(
    ([
      key,
      [proofId, payload, accountId, blockNumber],
    ]): ProofInternalPayload => {
      if (extended) {
        console.log('KEY: ', key.args[0].toHex()); // this is the hash of the proofId
        // console.log('VALUE: ', JSON.parse(hexToString(payload.toHex())));
        console.log('ACCOUNT ID: ', accountId.toString());
        console.log('BLOCK_NUMBER: ', blockNumber.toNumber());
      }
      // must hexToString to get the decoded value
      return {
        proof: JSON.parse(hexToString(payload.toHex())),
        proofId: hexToString(proofId.toString()),
      };
    },
  );

  return proofs;
}
