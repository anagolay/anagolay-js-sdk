import { Keyring } from '@polkadot/keyring'
import { KeyringPair } from '@polkadot/keyring/types'
import { stringToU8a } from '@polkadot/util'

// https://polkadot.js.org/api/start/keyring.html

/**
 * Get the Alice account
 */
export function getAlice (): KeyringPair {
  const ALICE_SEED = 'Alice'.padEnd(32, ' ')
  return getLocalAccount(ALICE_SEED)
}

/**
 * Get the local account
 */
export function getLocalAccount (name: string): KeyringPair {
  // Construct the keying after the API (crypto has an async init)
  const keyring = new Keyring()
  const pair = keyring.addFromSeed(stringToU8a(name))
  console.log(
    `Created keyring pair for Alice with address: ${
      keyring.getPair(pair.address).address
    }`
  )

  return pair
}
