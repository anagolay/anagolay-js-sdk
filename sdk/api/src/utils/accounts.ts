import { Keyring } from '@polkadot/keyring'
import { KeyringPair } from '@polkadot/keyring/types'
import { stringToU8a } from '@polkadot/util'

// https://polkadot.js.org/api/start/keyring.html

/**
 * Get the Alice account
 */
export function getAlice(): KeyringPair {
  // Construct the keying after the API (crypto has an async init)
  const keyring = new Keyring({ type: 'sr25519' })

  // Add Alice to our keyring with a hard-derived path (empty phrase, so uses dev)
  const alice = keyring.addFromUri('//Alice')
  return alice
}

/**
 * Get the Alice account
 */
export function getAliceEd25519(): KeyringPair {
  // Construct the keying after the API (crypto has an async init)
  const keyring = new Keyring({ type: 'ed25519' })

  // Add Alice to our keyring with a hard-derived path (empty phrase, so uses dev)
  const alice = keyring.addFromUri('//AliceEd25519')
  return alice
}

/**
 * Get the Sensio account
 */
export function getSensio(): KeyringPair {
  // Construct the keying after the API (crypto has an async init)
  const keyring = new Keyring({ type: 'ed25519' })

  // Add Alice to our keyring with a hard-derived path (empty phrase, so uses dev)
  const acc = keyring.addFromUri('//Sensio')
  return acc
}

/**
 * Get the Bob account
 */
export function getBob(): KeyringPair {
  // Construct the keying after the API (crypto has an async init)
  const keyring = new Keyring({ type: 'ed25519' })

  // Add Bob to our keyring with a hard-derived path (empty phrase, so uses dev)
  const bob = keyring.addFromUri('//Bob')
  return bob
}

/**
 * Get the local account
 */
export function getLocalAccount(name: string): KeyringPair {
  // Construct the keying after the API (crypto has an async init)
  const keyring = new Keyring()
  const pair = keyring.addFromSeed(stringToU8a(name))
  console.log(
    `Created keyring pair for Local Account with address: ${keyring.getPair(pair.address).address}`,
  )

  return pair
}
