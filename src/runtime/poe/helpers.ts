import { ApiPromise } from '@polkadot/api';
import { stringToU8a } from '@polkadot/util';
import { blake2AsHex } from '@polkadot/util-crypto';
import { writeFileSync } from 'fs';
import { objectToString } from '../../helpers';
import { Rule } from '../../interfaces';
import { saveRuleToBlockchain } from './poe';
import { camera, lens, photo } from './rules';

interface SavePayload {
  ruleId: string;
  payload: Rule;
}

/**
 * Create Rule payload and rule ID
 *
 * TODO refactor this to use unified way of creating the hashes and encoding using the network defaults
 * @param rule
 */
export function createRulePayload(api: ApiPromise, rule: Record<string, any>): SavePayload {
  const buf = stringToU8a(objectToString(rule));
  const hash = blake2AsHex(buf);
  const payload = api.createType('Rule', rule);
  const ret = { ruleId: hash, payload };
  return ret;
}

/**
 * Create Rules
 * @param api
 * @param signer
 */
export async function createDefaultRules(api: ApiPromise, signer: KeyringPair): Promise<void> {
  // console.log(api.query.poeModule);
  // const Rule = api.createType('Rule', rule);
  // console.log(Rule);

  return Promise.all([photo, lens, camera].map(async (r) => await createRulePayload(api, r)))
    .then((r) => {
      writeFileSync(`./files/poe-rules.json`, JSON.stringify(r, null, 2));
      saveRuleToBlockchain(api, r[0], signer)
        .then(() => saveRuleToBlockchain(api, r[1], signer))
        .then(() => saveRuleToBlockchain(api, r[2], signer))
        .then(() => console.log('All rules are saved'))
        .catch(console.error);
    })
    .catch(console.error);

  // const createdRule = await api.tx.poe.createRule(ruleId, rule).signAndSend(signer);
  // console.log('CreatedRule ', createdRule.toHex());
}
