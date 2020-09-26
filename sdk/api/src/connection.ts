/* eslint-disable @typescript-eslint/no-floating-promises */
import { ApiPromise, WsProvider } from '@polkadot/api'
import { RegistryTypes } from '@polkadot/types/types'
import '@sensio/types/interfaces/augment-api'
import '@sensio/types/interfaces/augment-types'
import * as CustomTypes from '@sensio/types/interfaces/definitions'
import { isNil } from 'ramda'

// Cached API connection
let api: ApiPromise

function buildTypes(): RegistryTypes {
  let types: RegistryTypes = {
    Address: 'AccountId',
    LookupSource: 'AccountId',
  }
  Object.keys(CustomTypes).map((pallet) => {
    types = { ...types, ...CustomTypes[pallet].types }
  })

  return types
}

/**
 * Connect to Sensio Network API
 *
 * ```ts
 * import setupConnection from '@sensio/api/connection'
 * const connection = setupConnection()
 * ```
 */
export async function setupConnection(socket?: string): Promise<ApiPromise> {
  try {
    let realSocket = socket

    if (isNil(realSocket)) {
      realSocket = process.env.SENSIO_NODE_URL ?? 'ws://127.0.0.1:9944'
    }

    console.log('API::connection to %s', realSocket)

    const provider = new WsProvider(realSocket)
    const types = buildTypes()
    if (isNil(api)) {
      // Init the server
      api = await ApiPromise.create({
        types: {
          ...types,

          // chain-specific overrides
          Address: 'AccountId',
          LookupSource: 'AccountId',
        },
        provider,
      })

      return api
    } else {
      return getApi()
    }
  } catch (error) {
    console.error(error)
    throw new Error(error.message)
  }
}

/**
 * Getter for the API cached connection
 */
export function getApi(): ApiPromise {
  if (isNil(api)) {
    throw new Error('Please init the api instance first, usually that would be *api.api()* ')
  } else {
    return api
  }
}

/**
 * Close the api connection, disconnect
 */
export async function disconnect(): Promise<void> {
  return await api.disconnect()
}

export default setupConnection
