import { Definitions, DefinitionsTypes } from '@polkadot/types/types';

export const StatementsCustomTypes: DefinitionsTypes = {
  Signature: {
    /// signing key in urn/did format 'urn:pgp:9cdf8dd38531511968c8d8cb524036585b62f15b'
    sigKey: 'Characters',
    /// Signature sign(prepared_statement, pvtKey(sigKey)) and encoded using multibase
    // https://gitlab.com/anagolay/sensio-faas/-/blob/master/sp-api/src/plugins/copyright/helpers.ts#L76
    sig: 'BoundedVec<u8, Get<u32>>',
    /// Content identifier of the sig field -- CID(sig)
    cid: 'SignatureId',
  },
  Signatures: {
    holder: 'Signature',
    issuer: 'Signature',
  },
  Proportion: {
    /// Proportion sign, can be %
    sign: 'Characters',
    name: 'Characters',
    value: 'Characters',
  },
  Validity: {
    /// When the validity starts, this should be DATE_TIME
    from: 'Characters',
    /// When validity ends, this is calculate Validity.from + Expiration.value
    until: 'Characters',
  },
  ExpirationType: {
    _enum: ['FOREVER', 'YEARS', 'MONTHS', 'DAYS', 'MINUTES', 'SECONDS'],
  },
  Expiration: {
    /// Proportion sign, can be %
    expirationType: 'ExpirationType',
    /// How long is the expiration, if  ExpirationType::FOREVER then this is empty
    value: 'Characters',
  },
  ClaimType: {
    _enum: ['COPYRIGHT', 'OWNERSHIP'],
  },
  Claim: {
    /// Prev Anagolay Statement id in case this statement is revoked or changed
    prevId: 'Option<StatementId>',
    /// PoE id of the record in question.
    poeId: 'ProofId',
    /// Implemented rule
    workflowId: 'WorkflowId',
    /// In which proportion the statement is held
    proportion: 'Proportion',
    /// ATM this is the same as poeId @TODO this should be unique representation of the subject that is NOT poe
    subjectId: 'ProofId',
    /// ATM this is the did representation of the substrate based account in format 'did:substrate:5EJA1oSrTx7xYMBerrUHLNktA3P89YHJBeTrevotTQab6gEY/sensio-network', @NOTE this is part of the SENSIO ID which will come later this year
    holder: 'CreatorId',
    /// ATM this is the did representation of the substrate based account in format 'did:substrate:Hcd78R7frJfUZHsqgpPEBLeiCZxV29uyyyURaPxB71ojNjy/sensio-network', @NOTE this is part of the SENSIO ID which will come later this year
    issuer: 'CreatorId',
    /// Generic type, ATM is Copyright or Ownership
    claimType: 'ClaimType',
    /// How long this statement is valid
    valid: 'Validity',
    /// Setting when the statement should end
    expiration: 'Expiration',
    /// What happens after the expiration? this is default rule or smart contract that automatically does stuff, like move it to the public domain, transfer to relatives etc... need better definition
    onExpiration: 'Characters',
  },
  StatementData: {
    signatures: 'Signatures',
    claim: 'Claim',
  },
  StatementExtra: {},
  Statement: {
    id: 'GenericId',
    data: 'StatementData',
    extra: 'Option<StatementExtra>',
  },
  StatementRecord: {
    record: 'Statement',
    accountId: 'AccountId',
    blockNumber: 'BlockNumber',
  },
};

export default {
  types: StatementsCustomTypes,
} as Definitions;
