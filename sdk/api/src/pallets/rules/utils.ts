import { AnGenericId } from '@anagolay/types'

/**
 * Within the context of execution, this method knows how to get the Rule ID that is currently implemented
 */
export function getCurrentlyImplementingRuleId(): AnGenericId {
  // @FUCK fix me
  return 'bafykbzacebyhpk6c7imf2a43cxo3viib74bpuc7ndc22zldlfxbthsjoze6pi'
  // return localStorage.getItem('sn:exec:current:ruleId')
}
