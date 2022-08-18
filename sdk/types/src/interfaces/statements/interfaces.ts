import {
  AnAccountId,
  AnBlockNumber,
  AnCharacters,
  AnCreatorId,
  AnProofId,
  AnSignatureId,
  AnStatementId,
  AnWorkflowId,
} from '../anagolaySupport/interfaces';

export interface AnSignature {
  /// signing key in urn/did format 'urn:pgp:9cdf8dd38531511968c8d8cb524036585b62f15b'
  sigKey: AnCharacters;
  /// Signature sign(prepared_statement, pvtKey(sigKey)) and encoded using multibase
  // https://gitlab.com/anagolay/sensio-faas/-/blob/master/sp-api/src/plugins/copyright/helpers.ts#L76
  sig: string;
  /// Content identifier of the sig field -- CID(sig)
  cid: AnSignatureId;
}

export interface AnSignatures {
  holder: AnSignature;
  issuer: AnSignature;
}

export interface AnProportion {
  /// Proportion sign, can be %
  sign: AnCharacters;
  name: AnCharacters;
  value: AnCharacters;
}

export interface AnValidity {
  /// When the validity starts, this should be DATE_TIME
  from: AnCharacters;
  /// When validity ends, this is calculate Validity.from + Expiration.value
  until: AnCharacters;
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
  expirationType: AnExpirationType;
  /// How long is the expiration, if  ExpirationType::FOREVER then this is empty
  value: AnCharacters;
}

export enum AnClaimType {
  COPYRIGHT,
  OWNERSHIP,
}

export interface AnClaim {
  /// Prev Sensio Statement id in case this statement is revoked or changed
  prevId?: AnStatementId;
  /// PoE id of the record in question.
  poeId: AnProofId;
  /// Implemented rule
  workflowId: AnWorkflowId;
  /// In which proportion the statement is held
  proportion: AnProportion;
  /// ATM this is the same as poeId @TODO this should be unique representation of the subject that is NOT poe
  subjectId: AnProofId;
  /// ATM this is the did representation of the substrate based account in format 'did:substrate:5EJA1oSrTx7xYMBerrUHLNktA3P89YHJBeTrevotTQab6gEY/sensio-network', @NOTE this is part of the SENSIO ID which will come later this year
  holder: AnCreatorId;
  /// ATM this is the did representation of the substrate based account in format 'did:substrate:Hcd78R7frJfUZHsqgpPEBLeiCZxV29uyyyURaPxB71ojNjy/sensio-network', @NOTE this is part of the SENSIO ID which will come later this year
  issuer: AnCreatorId;
  /// Generic type, ATM is Copyright or Ownership
  claimType: AnClaimType;
  /// How long this statement is valid
  valid: AnValidity;
  /// Setting when the statement should end
  expiration: AnExpiration;
  /// What happens after the expiration? this is default rule or smart contract that automatically does stuff, like move it to the public domain, transfer to relatives etc... need better definition
  onExpiration: AnCharacters;
}

export interface AnStatementData {
  signatures: AnSignatures;
  claim: AnClaim;
}

export interface AnStatementExtra {}

export interface AnStatement {
  id: AnStatementId;
  data: AnStatementData;
  extra?: AnStatementExtra;
}

export interface AnStatementRecord {
  statement: AnStatement;
  accountId: AnAccountId;
  blockNumber: AnBlockNumber;
}
