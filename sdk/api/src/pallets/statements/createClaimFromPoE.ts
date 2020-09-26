import {
  SnExpirationType,
  SnProof,
  SnSensioClaim,
  SnSensioClaimType,
  SnSensioCopyrightClaim,
  SnSensioOwnershipClaim,
} from '@sensio/types'
import { getCurrentlyImplementingRuleId } from '../rules/utils'

/**
 * Create the Ownership Claim from PoE record
 * @param poe
 * @returns the typescript native Ownership Claim object
 */
export function createOwnershipClaimFromPoE(
  poe: SnProof,
  claim?: Partial<SnSensioOwnershipClaim>,
): SnSensioOwnershipClaim {
  return {
    ...createClaimFromPoE(poe, claim),
    claimType: SnSensioClaimType.OWNERSHIP,
  }
}

/**
 * Create the Copyright Claim from PoE record
 * @param poe
 * @returns the typescript native Copyright Claim object
 */
export function createCopyrightClaimFromPoE(
  poe: SnProof,
  claim?: Partial<SnSensioCopyrightClaim>,
): SnSensioCopyrightClaim {
  return {
    ...createClaimFromPoE(poe, claim),
    claimType: SnSensioClaimType.COPYRIGHT,
  }
}

/**
 * Create the Claim from PoE record with default records
 * @param poe The proof from which claim will be generated
 * @param claim The claim object where user can override defaults. We merge this with the defaults
 * @returns the typescript native Claim object
 */
export function createClaimFromPoE(poe: SnProof, claim?: Partial<SnSensioClaim>): SnSensioClaim {
  return {
    prevId: '',
    poeId: poe.id,
    ruleId: getCurrentlyImplementingRuleId(),
    proportion: {
      name: 'percent',
      sign: '%',
      value: '100',
    },
    subjectId: poe.id,
    holder: poe.data.creator,
    issuer: 'did:substrate:5HBr9dSKkTjWr5XL7ZHGjQLgxf1ndfin7ERnJd1hN2P7xjTx/sensio-network',
    claimType: SnSensioClaimType.COPYRIGHT, // default
    valid: {
      from: Date.now().toFixed(),
      until: '',
    },
    expiration: {
      expirationType: SnExpirationType.FOREVER,
      value: '',
    },
    onExpiration: '',
    ...claim,
  }
}
