import '@anagolay/types/interfaces/augment-api'
import '@anagolay/types/interfaces/augment-types'

import api from './api'
import * as pallets from './pallets'
import * as utils from './utils'

export { ApiPromise } from '@polkadot/api'

export default {
  pallets,
  api,
  utils,
}

export {}
