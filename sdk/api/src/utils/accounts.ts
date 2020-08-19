import { Keyring } from '@polkadot/api'
import { KeyringPair } from '@polkadot/keyring/types'
import capitalize from '@sensio/api/utils/capitalize'
/**
 * Get the Alice account
 */
export function getAlice (): KeyringPair {
  return getLocalAccount('Alice')
}

/**
 * Get the local account
 */
export function getLocalAccount (name: string): KeyringPair {
  // Construct the keying after the API (crypto has an async init)
  const keyring = new Keyring({ type: 'sr25519' })

  return keyring.addFromUri(`//${capitalize(name.trim())}`)
}

export function createDemoAccount (): KeyringPair {
  // Construct the keying after the API (crypto has an async init)
  const keyring = new Keyring({ type: 'sr25519' })
  const demo = keyring.addFromUri('DEMO')
  return demo
}
