import { isNil } from 'ramda'

import { AnGenericId } from '@anagolay/types'

const LOCAL_STORAGE_CURRENT_RULE_ID_KEY = 'an::exec:currentRuleID'

interface ContextParams {
  ruleId: AnGenericId
}

interface ContextReturn {
  ruleId: AnGenericId
  executor: () => string
}

/**
 * Get the cached rule ID. This is the rule id that is currently processed
 */
export function getCurrentRuleId(): string {
  const r = localStorage.getItem(LOCAL_STORAGE_CURRENT_RULE_ID_KEY)

  if (isNil(r)) {
    throw new Error('No cached ruleID, did you forget to create the context?')
  } else {
    return r
  }
}

/**
 * Create the Context for the processing the rule for the browser
 * @param params
 */
export function createBrowserContext(params: ContextParams): ContextReturn {
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
