/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-console */
import api from '@anagolay/api';
import { EVENT_NAME_BATCH as operationEventName } from '@anagolay/api/pallets/operations/config';
import { getAlice } from '@anagolay/api/utils/accounts';
import calculateRecordCid from '@anagolay/api/utils/calculateRecordCid';
import saveBatch from '@anagolay/api/utils/saveBatch';
import replaceOperationNames from '@anagolay/core/replaceOperationNames';
import {
  AnAnagolayClaim,
  AnOperation,
  AnOperationWithStorage,
  AnProof,
  AnProofData,
  AnProofWithStorage,
  AnRule,
  AnRuleWithStorage,
  AnStatement,
  AnStatementData,
  AnStatementWithStorage,
} from '@anagolay/types';
import { stringToHex } from '@anagolay/util';
import { compose, descend, map, prop, sort } from 'ramda';
import ops from './fixtures/allOperations';
import * as testData from './fixtures/testFixtures';

/**
 * Save the ops TS file to network
 */
export async function saveOpsToChain(): Promise<void> {
  // init the api
  await api.api.setupConnection();

  const operations: AnOperation[] = ops;

  const signer = getAlice();
  const o = await api.pallets.operations.saveOperationsBulk(operations, signer);

  o.on(operationEventName, (p) => {
    if (p.error) {
      console.error(p);
    }

    if (p.finalized) {
      process.exit(0);
    }
  });
}

/**
 * Get All Operations from the chain
 */
export async function operationsFromChain(): Promise<void> {
  // init the api
  await api.api.setupConnection();

  const opsFromChain = await api.pallets.operations.getAllDecoded();

  console.info('getting stuff from chain');
  interface TableRowItem {
    id: string;
    name: string;
    accountId: string;
    priority: number;
  }

  function makeTableRow(o: AnOperationWithStorage): TableRowItem {
    return {
      id: o.operationInfo.operation.id,
      name: o.operationInfo.operation.data.name,
      accountId: o.operationInfo.accountId,
      priority: o.operationInfo.operation.data.priority,
    };
  }

  const sortByPriority = sort(descend(prop('priority')));

  console.table(compose(sortByPriority, map(makeTableRow))(opsFromChain));
  process.exit(0);
}

/**
 * Get All PoE from the chain
 */
export async function proofsFromChain(): Promise<void> {
  // init the api
  await api.api.setupConnection();

  const data = await api.pallets.poe.getAllDecoded();

  console.info('getting stuff from chain');
  interface TableRowItem {
    idHex: string;
    id?: string;
    accountId?: string;
  }

  function makeTableRow(o: AnProofWithStorage): TableRowItem {
    return {
      // id: o.proofInfo.proof.id,
      idHex: stringToHex(o.proofInfo.proof.id),
      // accountId: o.proofInfo.accountId,
    };
  }

  console.table(map(makeTableRow)(data));
  process.exit(0);
}

/**
 * Get All rules from the chain
 */
export async function rulesFromChain(): Promise<void> {
  // init the api
  await api.api.setupConnection();

  const rules = await api.pallets.rules.getAllDecoded();

  console.info('getting stuff from chain');
  interface TableRowItem {
    id: string;
    name: string;
    accountId: string;
    // description: string
    hexId: string;
  }

  function makeTableRow(o: AnRuleWithStorage): TableRowItem {
    return {
      id: o.ruleInfo.rule.id,
      name: o.ruleInfo.rule.data.name,
      accountId: o.ruleInfo.accountId,
      // description: o.ruleInfo.rule.data.desc,
      hexId: stringToHex(o.ruleInfo.rule.id),
    };
  }

  console.table(map(makeTableRow)(rules));
  process.exit(0);
}

/**
 * Get All statements from the chain
 */
export async function statementsFromChain(): Promise<void> {
  // init the api
  await api.api.setupConnection();

  const statements = await api.pallets.statements.getAllDecoded();

  console.info('getting stuff from chain');
  interface TableRowItem {
    id: string;
    poeId: string;
    accountId: string;
    // description: string
    hexId: string;
  }

  function makeTableRow(o: AnStatementWithStorage): TableRowItem {
    return {
      id: o.statementInfo.statement.id,
      poeId: o.statementInfo.statement.data.claim.poeId,
      accountId: o.statementInfo.accountId,
      // description: o.statementInfo.statement.data.desc,
      hexId: stringToHex(o.statementInfo.statement.id),
    };
  }

  console.table(map(makeTableRow)(statements));
  process.exit(0);
}

/**
 * Revoke All statements
 */
export async function revokeAllStatements(): Promise<void> {
  // init the api
  await api.api.setupConnection();

  const statements = await api.pallets.statements.getAllDecoded();
  const ids = statements.map((s) => s.statementInfo.statement.id);
  const signer = getAlice();
  const o = await api.pallets.statements.revokeStatementsBulk(ids, signer);

  o.on(operationEventName, (p) => {
    console.log(p.message);

    if (p.finalized) {
      process.exit(0);
    }
  });
}

export async function installFixtures(): Promise<void> {
  try {
    await api.api.setupConnection();

    const signer = getAlice();

    // 1. create ops
    const operations: AnOperation[] = ops;

    const o = await api.pallets.operations.createSubmittableExtrinsics(operations);

    // 2. create rules
    const rules: AnRule[] = await Promise.all(
      testData.testRules.map(async (r) => {
        const ops = await replaceOperationNames(r.ops);
        const data = { ...r, ops };

        return {
          id: await calculateRecordCid(data),
          data,
        };
      })
    );

    const r = await api.pallets.rules.createSubmittableExtrinsics(rules);

    // 3. create poe
    const proofs: AnProof[] = await Promise.all(
      testData.testPoe.map(async (r) => {
        const data: AnProofData = {
          ...r,
          ruleId: rules[parseInt(r.ruleId.split(':')[1])].id,
        };

        return {
          id: await calculateRecordCid(data),
          data,
        };
      })
    );
    const p = await api.pallets.poe.createSubmittableExtrinsics(proofs);

    // 4. add ownership statements
    const statements: AnStatement[] = await Promise.all(
      testData.testStatements.map(async (r) => {
        const claim: AnAnagolayClaim = {
          ...r.claim,
          poeId: proofs[parseInt(r.claim.poeId.split(':')[1])].id,
          ruleId: rules[parseInt(r.claim.ruleId.split(':')[1])].id,
        };

        const data: AnStatementData = {
          claim,
          signatures: r.signatures,
        };

        return {
          id: await calculateRecordCid(data),
          data,
        };
      })
    );
    const s = await api.pallets.statements.createSubmittableExtrinsicsForOwnership(statements);

    const txs = [...o, ...r, ...p, ...s];
    const b = await saveBatch(txs, signer);

    b.on('utils::txs::batch', (p) => {
      console.log('batch', p.message);

      if (p.finalized) {
        process.exit(0);
      }
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
