/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-floating-promises */
import '@anagolay/types/interfaces/augment-api'
import '@anagolay/types/interfaces/augment-types'
import * as CustomTypes from '@anagolay/types/interfaces/definitions'
import { ApiPromise, WsProvider } from '@polkadot/api'
import { RegistryTypes } from '@polkadot/types/types'
import { isNil } from 'ramda'

// Cached API connection
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let api: any = null

function buildTypes(): RegistryTypes {
  const types: RegistryTypes = {
    Address: 'AccountId',
    LookupSource: 'AccountId',
    ...CustomTypes.anagolay.types,
    ...CustomTypes.operations.types,
    ...CustomTypes.poe.types,
    ...CustomTypes.rules.types,
    ...CustomTypes.statements.types,
  }

  // console.log(JSON.stringify(types))
  return types
}

/**
 * Connect to Anagolay Network API
 *
 * ```ts
 * import setupConnection from '@anagolay/api/connection'
 * const connection = setupConnection()
 * ```
 */
export async function setupConnection(socket?: string): Promise<ApiPromise> {
  try {
    let realSocket = socket

    if (isNil(realSocket)) {
      realSocket = process.env.SENSIO_NODE_URL ?? 'ws://127.0.0.1:9944'
    }

    if (process.env.NODE_ENV !== 'test') {
      console.log('API::connection to %s', realSocket)
    }

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

      if (process.env.NODE_ENV !== 'test') {
        api.on('disconnected', () => console.log('api', 'disconnected'))
        api.on('connected', () => console.log('api', 'connected'))
        api.on('error', (error: any) => console.log('api', 'error', error))

        // Retrieve the chain & node information information via rpc calls
        const [chain, nodeName, nodeVersion] = await Promise.all([
          api.rpc.system.chain(),
          api.rpc.system.name(),
          api.rpc.system.version(),
        ])

        console.log(`You are connected to chain ${chain} using ${nodeName} v${nodeVersion}`)
      }

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
    throw new Error('Please init the api instance first, usually that would be *api.api()*')
  } else {
    return api
  }
}

/**
 * Close the api connection, disconnect
 */
export async function disconnect(): Promise<void> {
  try {
    if (!isNil(api) && api.isConnected) {
      await api.disconnect()
    }

    api = null
  } catch (error) {
    //swallow the error
    console.log('disconnect got error')
  }
}

export default setupConnection
