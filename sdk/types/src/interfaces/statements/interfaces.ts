import { AnAccountId, AnBlockNumber, AnCreatorId, AnGenericId } from '../anagolay/interfaces'

export interface AnProportion {
  /// Proportion sign, can be %
  sign: string
  name: string
  value: string
}

export interface AnValidity {
  /// When the validity starts, this should be DATE_TIME
  from: string
  /// When validity ends, this is calculate Validity.from + Expiration.value
  until: string
}

export enum AnExpirationType {
  FOREVER,
  YEARS,
  MONTHS,
  DAYS,
  MINUTES,
  SECONDS,
}

export interface AnExpiration {
  /// Proportion sign, can be %
  expirationType: AnExpirationType
  /// How long is the expiration, if  ExpirationType::FOREVER then this is empty
  value: string
}

export enum AnAnagolayClaimType {
  COPYRIGHT,
  OWNERSHIP,
}

export interface AnAnagolayClaim {
  /// Prev Sensio Statement id in case this statement is revoked or changed
  prevId: AnGenericId
  /// PoE id of the record in question.
  poeId: AnGenericId
  /// Implemented rule
  ruleId: AnGenericId
  /// In which proportion the statement is held
  proportion: AnProportion
  /// ATM this is the same as poeId @TODO this should be unique representation of the subject that is NOT poe
  subjectId: AnGenericId
  /// ATM this is the did representation of the substrate based account in format 'did:substrate:5EJA1oSrTx7xYMBerrUHLNktA3P89YHJBeTrevotTQab6gEY/sensio-network', @NOTE this is part of the SENSIO ID which will come later this year
  holder: AnCreatorId
  /// ATM this is the did representation of the substrate based account in format 'did:substrate:Hcd78R7frJfUZHsqgpPEBLeiCZxV29uyyyURaPxB71ojNjy/sensio-network', @NOTE this is part of the SENSIO ID which will come later this year
  issuer: string
  /// Generic type, ATM is Copyright or Ownership
  claimType: AnAnagolayClaimType
  /// How long this statement is valid
  valid: AnValidity
  /// Setting when the statement should end
  expiration: AnExpiration
  /// What happens after the expiration? this is default rule or smart contract that automatically does stuff, like move it to the public domain, transfer to relatives etc... need better definition
  onExpiration: string
}

export interface AnAnagolayOwnershipClaim extends AnAnagolayClaim {
  claimType: AnAnagolayClaimType.OWNERSHIP
}

export interface AnAnagolayCopyrightClaim extends AnAnagolayClaim {
  claimType: AnAnagolayClaimType.COPYRIGHT
}

export interface AnAnagolaySignature {
  /// signing key in urn/did format 'urn:pgp:9cdf8dd38531511968c8d8cb524036585b62f15b'
  sigKey: string
  /// Signature sign(prepared_statement, pvtKey(sigKey)) and encoded using multibase
  // https://gitlab.com/anagolay/sensio-faas/-/blob/master/sp-api/src/plugins/copyright/helpers.ts#L76
  sig: string
  /// Content identifier of the sig field -- CID(sig)
  cid: AnGenericId
}

export interface AnAnagolaySignatures {
  holder: AnAnagolaySignature
  issuer: AnAnagolaySignature
}

export interface AnStatementData {
  signatures: AnAnagolaySignatures
  claim: AnAnagolayClaim
}

export interface AnAnagolayStatement {
  id: AnGenericId
  data: AnStatementData
}

export interface AnStatementInfo {
  statement: AnAnagolayStatement
  accountId: AnAccountId
  blockNumber: AnBlockNumber
}

export interface AnStatementWithStorage {
  storageKey: string
  statementInfo: AnStatementInfo
}
