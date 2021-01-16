import { SnGenericId } from '@sensio/types'
import { isNil } from 'ramda'

const LOCAL_STORAGE_CURRENT_RULE_ID_KEY = 'sn::exec:currentRuleID'

interface ContextParams {
  ruleId: SnGenericId
}

interface ConntextReturn {
  ruleId: SnGenericId
  executor: () => string
}

/**
 * Get the cached rule ID. This is the rule id that is currently processed
 */
export function getCurrentRuleId(): string {
  const r = localStorage.getItem(LOCAL_STORAGE_CURRENT_RULE_ID_KEY)
  if (isNil(r)) {
    throw new Error('No cached ruleID, did you forget to create the context?')
  }
  return r
}

/**
 * Create the Context for the processing the rule for the browser
 * @param params
 */
export function createBrowserContext(params: ContextParams): ConntextReturn {
  if (typeof localStorage === 'undefined') {
    throw new Error('localStorage is not defined')
  }

  localStorage.setItem(LOCAL_STORAGE_CURRENT_RULE_ID_KEY, params.ruleId)

  return {
    ruleId: params.ruleId,
    executor: () => {
      return 'start'
    },
  }
}

/**
 * Delete the context
 */
export function deleteContext(): boolean {
  return true
}
