import { ApiPromise } from '@anagolay/api'

// Ensure file is treated as a module
export {}

declare global {
  namespace NodeJS {
    interface Global {
      api: ApiPromise
    }
  }
}
