import { createRulePayload } from './poe';
import { rule } from './rules/poe-photo';
import { hexToString } from '@polkadot/util';

export async function createRule(api, signer): Promise<void> {
  // console.log(api.query.poeModule);
  const { payload, ruleId } = await createRulePayload(rule);

  const createdRuleSimple = await api.tx.poeModule.createRuleSimple(ruleId, payload).signAndSend(signer);
  console.log('CreatedRuleSimple ', createdRuleSimple.toHex());

  // const createdRule = await api.tx.poeModule.createRule(ruleId, rule).signAndSend(signer);
  // console.log('CreatedRule ', createdRule.toHex());
}

interface RulePayloadValue extends Uint8Array {
  toHex: () => string;
}

interface StorageKey {
  [k: string]: {
    args: Uint8Array[];
  };
}

export async function getRules(api, extended = false): Promise<void> {
  const c = (await api.query.poeModule.rulesSimple.entries()) as [StorageKey, [Uint8Array, RulePayloadValue]][];
  console.log(`FOUND ${c.length} rules`);
  if (extended) {
    c.forEach(([key, [accountId, payload]]) => {
      console.log('KEY: ', hexToString(key.args[0].toHex()));
      console.log('ACCOUNT ID: ', accountId.toString());
      console.log('VALUE: ', JSON.parse(hexToString(payload.toHex())));
    });
  }
}

export async function createClaim(api, signer): Promise<void> {
  // console.log(api.query.poeModule);

  const claim = await api.tx.poeModule.createClaim('0x11', '0x12').signAndSend(signer);
  console.log('Claim created ', claim.toHex());
}

interface Storage {
  RulesSimple: {
    [k: string]: string;
  };
}
