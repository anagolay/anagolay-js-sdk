import replaceOperationNames from '@anagolay/core/replaceOperationNames';
import { AnRuleData } from '@anagolay/types';

import { rule } from './fixtures/rules/poclo';

/**
 * Build the rule based in the JSON definition
 */
export async function buildPocloRule(): Promise<AnRuleData> {
  const ops = await replaceOperationNames(rule.ops);

  return { ...rule, ops };
}
