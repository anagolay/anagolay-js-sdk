export const RulesCustomTypes = {
  Proportion: {
    /// Proportion sign, can be %
    sign: 'Vec<u8>',
    name: 'Vec<u8>',
    value: 'Vec<u8>'
  },
  Validity: {
    /// When the validity starts, this should be DATE_TIME
    from: 'Vec<u8>',
    /// When validity ends, this is calculate Validity.from + Expiration.value
    until: 'Vec<u8>'
  },
  ExpirationType: {
    _enum: ['FOREVER', 'YEARS', 'MONTHS', 'DAYS', 'MINUTES', 'SECONDS']
  },
  Expiration: {
    /// Proportion sign, can be %
    expiration_type: 'ExpirationType',
    /// How long is the expiration, if  ExpirationType::FOREVER then this is empty
    value: 'Vec<u8>'
  },
  SensioClaimType: {
    _enum: ['COPYRIGHT', 'OWNERSHIP']
  },
  SensioClaim: {
    /// Prev Sensio Statement id in case this statement is revoked or changed
    prevId: 'GenericId',
    /// PoE id of the record in question.
    poeId: 'GenericId',
    /// Implemented rule
    ruleId: 'GenericId',
    /// In which proportion the statement is held
    proportion: 'Proportion',
    /// ATM this is the same as poeId @TODO this should be unique representation of the subject that is NOT poe
    subjectId: 'GenericId',
    /// ATM this is the did representation of the substrate based account in format 'did:substrate:5EJA1oSrTx7xYMBerrUHLNktA3P89YHJBeTrevotTQab6gEY/sensio-network', @NOTE this is part of the SENSIO ID which will come later this year
    holder: 'CreatorId',
    /// ATM this is the did representation of the substrate based account in format 'did:substrate:Hcd78R7frJfUZHsqgpPEBLeiCZxV29uyyyURaPxB71ojNjy/sensio-network', @NOTE this is part of the SENSIO ID which will come later this year
    issuer: 'Vec<u8>',
    /// Generic type, ATM is Copyright or Ownership
    claimType: 'SensioClaimType',
    /// How long this statement is valid
    valid: 'Validity',
    /// Setting when the statement should end
    expiration: 'Expiration',
    /// What happens after the expiration? this is default rule or smart contract that automatically does stuff, like move it to the public domain, transfer to relatives etc... need better definition
    on_expiration: 'Vec<u8>'
  },
  SensioSignature: {
    /// signing key in urn/did format 'urn:pgp:9cdf8dd38531511968c8d8cb524036585b62f15b'
    sigKey: 'Vec<u8>',
    /// Signature sign(prepared_statement, pvtKey(sigKey)) and encoded using multibase
    // https://gitlab.com/sensio_group/sensio-faas/-/blob/master/sp-api/src/plugins/copyright/helpers.ts#L76
    sig: 'Vec<u8>',
    /// Content identifier of the sig field -- CID(sig)
    hash: 'GenericId'
  },
  SensioSignatures: {
    holder: 'SensioSignature',
    issuer: 'SensioSignature'
  },
  StatementData: {
    signatures: 'SensioSignatures',
    claim: 'SensioClaim'
  },
  SensioStatement: {
    id: 'GenericId',
    data: 'StatementData'
  },
  StatementInfo: {
    statement: 'SensioStatement',
    accountId: 'AccountId',
    blockNumber: 'BlockNumber'
  }
}

export default {
  types: {
    ...RulesCustomTypes
  }
}
