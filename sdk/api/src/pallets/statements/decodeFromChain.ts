/* eslint-disable @typescript-eslint/consistent-type-assertions */

import decodeHexToString from '@sensio/api/utils/decodeHexToString'
import {
  Expiration,
  Proportion,
  SensioSignature,
  SensioStatement,
  SnExpiration,
  SnProportion,
  SnSensioSignature,
  SnStatement,
  SnValidity,
  Validity,
} from '@sensio/types'

/**
 * Decodes the Statement from the chain to readable object
 * @param d Statement SCALE Codec from the Network
 */
export function decodeFromChain(d: SensioStatement): SnStatement {
  const {
    data: { claim, signatures },
  } = d
  const decoded: SnStatement = {
    id: decodeHexToString(d.id),
    data: {
      claim: {
        prevId: decodeHexToString(claim.prevId),
        poeId: decodeHexToString(claim.poeId),
        ruleId: decodeHexToString(claim.ruleId),
        proportion: decodeProportion(claim.proportion),
        subjectId: decodeHexToString(claim.subjectId),
        holder: decodeHexToString(claim.holder),
        issuer: decodeHexToString(claim.issuer),
        claimType: claim.claimType.toNumber(),
        valid: decodeValidity(claim.valid),
        expiration: decodeExpiration(claim.expiration),
        onExpiration: decodeHexToString(claim.onExpiration),
      },
      signatures: {
        holder: decodeSignature(signatures.holder),
        issuer: decodeSignature(signatures.issuer),
      },
    },
  }
  return decoded
}

/**
 * Decode Signature
 * @param d
 */
export function decodeSignature(d: SensioSignature): SnSensioSignature {
  return {
    cid: decodeHexToString(d.cid),
    sig: decodeHexToString(d.sig),
    sigKey: decodeHexToString(d.sigKey),
  }
}

/**
 * Decode Expiration
 * @param d
 */
export function decodeExpiration(d: Expiration): SnExpiration {
  return {
    expirationType: d.expirationType.toNumber(),
    value: decodeHexToString(d.value),
  }
}
/**
 * Decode Validity
 * @param d
 */
export function decodeValidity(d: Validity): SnValidity {
  return {
    from: decodeHexToString(d.from),
    until: decodeHexToString(d.until),
  }
}

/**
 * Decode proportion
 * @param d
 */
export function decodeProportion(d: Proportion): SnProportion {
  return {
    sign: decodeHexToString(d.sign),
    name: decodeHexToString(d.name),
    value: decodeHexToString(d.value),
  }
}

export default decodeFromChain
