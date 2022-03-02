import { AnInputParamsDefinition } from '@anagolay/types';

/**
 * Custom error for wrong input <- output params
 */
export class IncompatibleInputParamChildOperationError extends Error {
  /**
   * Extra data
   */
  public extra: Record<string, unknown>;

  constructor(
    operationName: string,
    childOperationName: string,
    input: AnInputParamsDefinition[],
    output: AnInputParamsDefinition
  ) {
    const message = `Incompatible ${operationName} input -> ${childOperationName} output`;

    super(message);
    this.name = 'IncompatibleInputParamChildOperationError';
    this.extra = {
      input,
      output,
    };
  }
}
