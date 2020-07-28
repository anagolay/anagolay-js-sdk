/* eslint-disable @typescript-eslint/no-floating-promises */
import { ApiPromise, Keyring, WsProvider } from '@polkadot/api'
import { KeyringPair } from '@polkadot/keyring/types'
import { RegistryTypes } from '@polkadot/types/types'
import { DefaultValues } from '@sensio/types/lib/interfaces'
import '@sensio/types/lib/interfaces/augment-api'
import '@sensio/types/lib/interfaces/augment-types'
import * as CustomTypes from '@sensio/types/lib/interfaces/definitions'

// Cached API
export let api: ApiPromise | null = null

export function showBlockInfo (api: ApiPromise): void {
  // make a call to retrieve the current network head
  api.rpc.chain.subscribeNewHeads(async header => {
    await api.rpc.chain.getBlock(header.hash, async block => {
      // don't crash
      try {
        const blockNumber = block.block.header.number.toNumber()
        console.log('Block is:', blockNumber)
        // Extrinsics in the block
        const extrinsics = block.block.extrinsics
        // Check each extrinsic in the block
        for (const extrinsic of extrinsics) {
          // This specific call index [0,1] represents `system.remark`
          console.log(extrinsic.callIndex)
          console.log(extrinsic)
        }
      } catch (error) {
        console.error(error)
      }
    })
  })
}
/**
 * Constants from PoE Runtime
 * @param api
 */
export async function constantsForSensio (
  api: ApiPromise
): Promise<DefaultValues> {
  const defaultValues: DefaultValues = await api.consts.sensio.defaults

  return defaultValues
}

/**
 * Get the Alice account
 */
export function getAlice (): KeyringPair {
  // Construct the keying after the API (crypto has an async init)
  const keyring = new Keyring({ type: 'sr25519' })

  // Add Alice to our keyring with a hard-derived path (empty phrase, so uses dev)
  const alice = keyring.addFromUri('//Alice')
  return alice
}

export function createDemoAccount (): KeyringPair {
  // Construct the keying after the API (crypto has an async init)
  const keyring = new Keyring({ type: 'sr25519' })
  const demo = keyring.addFromUri('DEMO')
  return demo
}

export function buildTypes (): RegistryTypes {
  let types: RegistryTypes = {
    Address: 'AccountId',
    LookupSource: 'AccountId'
  }
  Object.keys(CustomTypes).map(pallet => {
    types = { ...types, ...CustomTypes[pallet].types }
  })

  return types
}

/**
 * Connect to Sensio Network API
 *
 * ```ts
 * // Or you can specify the language explicitly
 * import {api} from '@sensio/api';
 * const connection = api()
 * ```
 */
export default async function setupConnection (
  socket = 'ws://127.0.0.1:9944'
): Promise<ApiPromise> {
  // Init the provider to connect to the local node
  const provider = new WsProvider(socket)

  const types = buildTypes()

  // Init the server
  api = await ApiPromise.create({
    types: {
      ...types,

      // chain-specific overrides
      Address: 'AccountId',
      LookupSource: 'AccountId'
    },
    provider
  })
  return api
}
