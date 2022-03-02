/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { AnOperation } from '@anagolay/types';
import { stringCamelCase } from '@anagolay/util';

export const mainFuncBodyTpl = (op: AnOperation): string => {
  const { data } = op;

  return `import { InputParams, ReturnParams } from './interfaces'
  import { executeOperation } from '@anagolay/core/execution'
  import { AnOperation } from '@anagolay/types'
  import config from './config'
 
/**
* ${data.desc}
* @typeParam T Type \`T\` is generic and it is used to get the latest child operation. With default export use generic type so this operation can be executed from the leaf child
* @return output (${data.output.desc}) and decoder function
*/
export default async function execute<T> (params: T[]): Promise<ReturnParams> {
  ${formatOps(data.ops)}
  
 
  if (inputLength !== 1) {
    throw new Error("This operation doesn't support more than one input param ")
  }

  const c: AnOperation = config
  return executeOperation<T, ReturnParams>(c,params)
}

/**
* ${data.desc}
* @param params InputParams what this method expects
* @return output (${data.output.desc}) and decoder function
*/
export async function ${stringCamelCase(data.name)} (params: InputParams): Promise<ReturnParams> {
  const inputLength = config.data.input.length
  // start implementation here
  console.log('${stringCamelCase(data.name)}', params)
  const data = params[inputLength - 1]
  return {
    data: data.data,
    decode: () => 'CHANGE_ME'
  }
}
`;
};

function formatOps(ops: AnOperation[]): string {
  return ops.length > 0 ? `console.log('we have ${ops.length} child ops')` : '';
}
