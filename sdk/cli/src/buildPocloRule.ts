import replaceOperationNames from '@sensio/core/replaceOperationNames'
import { SnRuleData } from '@sensio/types'
import { rule } from './fixtures/rules/poclo'

/**
 * Build the rule based in the JSON definition
 */
export async function buildPocloRule(): Promise<SnRuleData> {
  const ops = await replaceOperationNames(rule.ops)
  return { ...rule, ops }
}
