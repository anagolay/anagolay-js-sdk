import { SnAccountId, SnBlockNumber, SnCreatorId, SnGenericId } from '../sensio/interfaces'

export interface SnProportion {
  /// Proportion sign, can be %
  sign: string
  name: string
  value: string
}

export interface SnValidity {
  /// When the validity starts, this should be DATE_TIME
  from: string
  /// When validity ends, this is calculate Validity.from + Expiration.value
  until: string
}

export enum SnExpirationType {
  FOREVER,
  YEARS,
  MONTHS,
  DAYS,
  MINUTES,
  SECONDS,
}

export interface SnExpiration {
  /// Proportion sign, can be %
  expirationType: SnExpirationType
  /// How long is the expiration, if  ExpirationType::FOREVER then this is empty
  value: string
}

export enum SnSensioClaimType {
  COPYRIGHT,
  OWNERSHIP,
}

export interface SnSensioClaim {
  /// Prev Sensio Statement id in case this statement is revoked or changed
  prevId: SnGenericId
  /// PoE id of the record in question.
  poeId: SnGenericId
  /// Implemented rule
  ruleId: SnGenericId
  /// In which proportion the statement is held
  proportion: SnProportion
  /// ATM this is the same as poeId @TODO this should be unique representation of the subject that is NOT poe
  subjectId: SnGenericId
  /// ATM this is the did representation of the substrate based account in format 'did:substrate:5EJA1oSrTx7xYMBerrUHLNktA3P89YHJBeTrevotTQab6gEY/sensio-network', @NOTE this is part of the SENSIO ID which will come later this year
  holder: SnCreatorId
  /// ATM this is the did representation of the substrate based account in format 'did:substrate:Hcd78R7frJfUZHsqgpPEBLeiCZxV29uyyyURaPxB71ojNjy/sensio-network', @NOTE this is part of the SENSIO ID which will come later this year
  issuer: string
  /// Generic type, ATM is Copyright or Ownership
  claimType: SnSensioClaimType
  /// How long this statement is valid
  valid: SnValidity
  /// Setting when the statement should end
  expiration: SnExpiration
  /// What happens after the expiration? this is default rule or smart contract that automatically does stuff, like move it to the public domain, transfer to relatives etc... need better definition
  onExpiration: string
}

export interface SnSensioOwnershipClaim extends SnSensioClaim {
  claimType: SnSensioClaimType.OWNERSHIP
}

export interface SnSensioCopyrightClaim extends SnSensioClaim {
  claimType: SnSensioClaimType.COPYRIGHT
}

export interface SnSensioSignature {
  /// signing key in urn/did format 'urn:pgp:9cdf8dd38531511968c8d8cb524036585b62f15b'
  sigKey: string
  /// Signature sign(prepared_statement, pvtKey(sigKey)) and encoded using multibase
  // https://gitlab.com/sensio_group/sensio-faas/-/blob/master/sp-api/src/plugins/copyright/helpers.ts#L76
  sig: string
  /// Content identifier of the sig field -- CID(sig)
  cid: SnGenericId
}

export interface SnSensioSignatures {
  holder: SnSensioSignature
  issuer: SnSensioSignature
}

export interface SnStatementData {
  signatures: SnSensioSignatures
  claim: SnSensioClaim
}

export interface SnSensioStatement {
  id: SnGenericId
  data: SnStatementData
}

export interface SnStatementInfo {
  statement: SnSensioStatement
  accountId: SnAccountId
  blockNumber: SnBlockNumber
}

export interface SnStatementWithStorage {
  storageKey: string
  statementInfo: SnStatementInfo
}
