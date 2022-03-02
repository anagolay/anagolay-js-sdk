import {
  AnAnagolayClaim,
  AnAnagolayClaimType,
  AnAnagolayCopyrightClaim,
  AnAnagolayOwnershipClaim,
  AnExpirationType,
  AnProof,
} from '@anagolay/types';
import { getCurrentlyImplementingRuleId } from '../rules/utils';

/**
 * Create the Ownership Claim from PoE record
 * @param poe
 * @returns the typescript native Ownership Claim object
 */
export function createOwnershipClaimFromPoE(
  poe: AnProof,
  claim?: Partial<AnAnagolayOwnershipClaim>
): AnAnagolayOwnershipClaim {
  return {
    ...createClaimFromPoE(poe, claim),
    claimType: AnAnagolayClaimType.OWNERSHIP,
  };
}

/**
 * Create the Copyright Claim from PoE record
 * @param poe
 * @returns the typescript native Copyright Claim object
 */
export function createCopyrightClaimFromPoE(
  poe: AnProof,
  claim?: Partial<AnAnagolayCopyrightClaim>
): AnAnagolayCopyrightClaim {
  return {
    ...createClaimFromPoE(poe, claim),
    claimType: AnAnagolayClaimType.COPYRIGHT,
  };
}

/**
 * Create the Claim from PoE record with default records
 * @param poe The proof from which claim will be generated
 * @param claim The claim object where user can override defaults. We merge this with the defaults
 * @returns the typescript native Claim object
 */
export function createClaimFromPoE(poe: AnProof, claim?: Partial<AnAnagolayClaim>): AnAnagolayClaim {
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
    claimType: AnAnagolayClaimType.COPYRIGHT, // default
    valid: {
      from: Date.now().toFixed(),
      until: '',
    },
    expiration: {
      expirationType: AnExpirationType.FOREVER,
      value: '',
    },
    onExpiration: '',
    ...claim,
  };
}
