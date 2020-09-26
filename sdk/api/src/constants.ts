/* eslint-disable @typescript-eslint/no-floating-promises */
import { ApiPromise } from '@polkadot/api'
import { DefaultValues } from '@sensio/types/interfaces'
import '@sensio/types/interfaces/augment-api'
import '@sensio/types/interfaces/augment-types'

/**
 * Constants from PoE Runtime
 * @param api
 */
export default async function constantsForSensio(api: ApiPromise): Promise<DefaultValues> {
  const defaultValues: DefaultValues = await api.consts.sensio.defaults

  return defaultValues
}
