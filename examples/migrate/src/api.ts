import '@anagolay/types/augment-api';

import {
  Operation,
  OperationRecord,
  OperationVersion,
  OperationVersionRecord,
  VersionId,
  Workflow,
  WorkflowRecord,
  WorkflowVersion,
} from '@anagolay/types';
import { ApiPromise } from '@anagolay/api';
import { Option } from '@polkadot/types';
import { AccountId } from '@polkadot/types/interfaces';

export interface OperationWithVersions {
  op: Operation;
  versions: OperationVersion[];
  accountId: AccountId;
}

export interface WorkflowWithVersions {
  wf: Workflow;
  versions: WorkflowVersion[];
  accountId: AccountId;
}

/**
 * Fetch the operations from the chain then format them.
 * @param chain - Connected chain instance
 * @returns
 */
export async function retrieveOperations(chain: ApiPromise): Promise<OperationWithVersions[]> {
  // retrieve the operations from the chain
  const operations = await chain.query.operations.operationByOperationIdAndAccountId.entries<
    Option<OperationRecord>
  >();

  return await Promise.all(
    operations.map(async ([, opRecord]: [unknown, Option<OperationRecord>]) => {
      const op: Operation = opRecord.unwrap().record;

      const versionIds = await chain.query.operations.versionIdsByOperationId<VersionId[]>(op.id);

      const versions: OperationVersion[] = await Promise.all(
        versionIds.map(async (versionId: VersionId) => {
          const opVerRecord = await chain.query.operations.versionByVersionId<Option<OperationVersionRecord>>(
            versionId
          );
          return opVerRecord.unwrap().record;
        })
      );
      return {
        op,
        versions,
        accountId: opRecord.unwrap().accountId,
      };
    })
  );
}

/**
 * Fetch the workflows from the chain then format them.
 * @param chain - Connected chain instance
 * @returns
 */
export async function retrieveWorkflows(chain: ApiPromise): Promise<WorkflowWithVersions[]> {
  // retrieve the operations from the chain
  const workflows = await chain.query.workflows.workflowByWorkflowIdAndAccountId.entries<
    Option<WorkflowRecord>
  >();

  return await Promise.all(
    workflows.map(async ([, wfRecord]: [unknown, Option<WorkflowRecord>]) => {
      const wf: Workflow = wfRecord.unwrap().record;

      const versionIds = await chain.query.workflows.versionIdsByWorkflowId<VersionId[]>(wf.id);

      const versions: WorkflowVersion[] = await Promise.all(
        versionIds.map(async (versionId: VersionId) => {
          const wfVerRecord = await chain.query.workflows.versionByVersionId<Option<OperationVersionRecord>>(
            versionId
          );
          return wfVerRecord.unwrap().record;
        })
      );
      return {
        wf,
        versions,
        accountId: wfRecord.unwrap().accountId,
      };
    })
  );
}
