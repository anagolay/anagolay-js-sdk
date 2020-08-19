import { SnInputParamsDefinition } from '@sensio/types'

/**
 * Custom error for wrong input <- output params
 */
export class IncompatibleInputParamChildOperationError extends Error {
  /**
   * Extra data
   */
  public extra: {}

  constructor (
    operationName: string,
    childOperationName: string,
    input: SnInputParamsDefinition[],
    output: SnInputParamsDefinition
  ) {
    const message = `Incompatible ${operationName} input -> ${childOperationName} output`
    super(message)
    this.name = 'IncompatibleInputParamChildOperationError'
    this.extra = {
      input,
      output
    }
  }
}
