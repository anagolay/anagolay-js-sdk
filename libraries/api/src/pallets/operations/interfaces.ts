import { AnOperation, AnOperationVersion } from '@anagolay/types';

/**
 * @public
 */
export interface IOperationWithVersions {
  operation: AnOperation;
  versions: AnOperationVersion[];
}
