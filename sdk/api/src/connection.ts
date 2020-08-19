/* eslint-disable @typescript-eslint/no-floating-promises */
import { ApiPromise, WsProvider } from '@polkadot/api'
import { RegistryTypes } from '@polkadot/types/types'
import '@sensio/types/interfaces/augment-api'
import '@sensio/types/interfaces/augment-types'
import * as CustomTypes from '@sensio/types/interfaces/definitions'
import { isNil } from 'ramda'

// Cached API connection
let api: ApiPromise | null = null

function buildTypes (): RegistryTypes {
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
  if (isNil(api)) {
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
  } else {
    return getApi()
  }
}

/**
 * Getter for the API cached connection
 */
export function getApi (): ApiPromise {
  if (isNil(api)) {
    throw new Error(
      'Please init the api instance first, usually that would be *api.api()* '
    )
  } else {
    return api
  }
}
