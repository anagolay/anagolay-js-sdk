import { AnOperation } from '@anagolay/types';

export const configTemplate = (op: AnOperation): string =>
  `/**
 * Operation specification
 */
import { AnOperation } from '@anagolay/types'

export const op: AnOperation = ${JSON.stringify(op, null, 2)}

export default op
`;

export default configTemplate;
