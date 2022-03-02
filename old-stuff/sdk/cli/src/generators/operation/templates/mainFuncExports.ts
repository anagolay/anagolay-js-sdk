/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { AnOperation } from '@anagolay/types';
import { stringCamelCase } from '@anagolay/util';

/**
 * Return the main exports so we don't need to use lib
 * @param op Operation
 */
export const mainFuncExports = (op: AnOperation): string => {
  return `export { default as config } from './config'
  export * from './interfaces'
  export * from './module'
  import ${stringCamelCase(op.data.name)} from './module'
  
  export default ${stringCamelCase(op.data.name)}
  
`;
};
