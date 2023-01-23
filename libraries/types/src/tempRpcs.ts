export default {
  tipping: {
    getTips: {
      description: 'Retrieve tips for specific account and verification context.',
      params: [
        {
          name: 'account_id',
          type: 'AccountId'
        },
        {
          name: 'verification_context',
          type: 'VerificationVerificationContext'
        },
        {
          name: 'offset',
          type: 'u64'
        },
        {
          name: 'limit',
          type: 'u16'
        },
        {
          name: 'at',
          type: 'BlockHash',
          isOptional: true
        }
      ],
      type: 'Vec<TippingTip<Balance, AccountId, BlockNumber>>'
    },
    total: {
      description: 'Get the total balance of tips received for a [`VerificationContext`]',
      params: [
        {
          name: 'account_id',
          type: 'AccountId'
        },
        {
          name: 'verification_context',
          type: 'VerificationVerificationContext'
        }
      ],
      type: 'u64'
    },
    totalReceived: {
      description: 'Get the total balance of tips received for a [`VerificationContext`]',
      params: [
        {
          name: 'account_id',
          type: 'AccountId'
        },
        {
          name: 'verification_context',
          type: 'VerificationVerificationContext'
        }
      ],
      type: 'Balance'
    }
  },
  verification: {
    getRequests: {
      description: 'Retrieve verification context data.',
      params: [
        {
          name: 'contexts',
          type: 'Vec<VerificationVerificationContext>'
        },
        {
          name: 'status',
          type: 'Option<VerificationVerificationStatus>'
        },
        {
          name: 'offset',
          type: 'u64'
        },
        {
          name: 'limit',
          type: 'u16'
        },
        {
          name: 'at',
          type: 'BlockHash',
          isOptional: true
        }
      ],
      type: 'Vec<VerificationVerificationRequest<AccountId>>'
    },
    getRequestsForAccount: {
      description: 'Retrieve verification contexts for a specific account',
      params: [
        {
          name: 'account',
          type: 'AccountId'
        },
        {
          name: 'status',
          type: 'Option<VerificationVerificationStatus>'
        },
        {
          name: 'offset',
          type: 'u64'
        },
        {
          name: 'limit',
          type: 'u16'
        }
      ],
      type: 'Vec<VerificationVerificationRequest<AccountId>>'
    }
  },
  operations: {
    getOperationsByIds: {
      description:
        'Get a subset of Operations representing a page, given the full set of the ids to paginate and the pagination information',
      params: [
        {
          name: 'operation_ids',
          type: 'Vec<OperationsOperationId>'
        },
        {
          name: 'offset',
          type: 'u64'
        },
        {
          name: 'limit',
          type: 'u16'
        },
        {
          name: 'at',
          type: 'Hash',
          isOptional: true
        }
      ],
      type: 'Vec<OperationsOperation>'
    },
    getOperationVersionsByIds: {
      description:
        'Get a subset of OperationVersions representing a page, given the full set of the ids to paginate and the pagination information',
      params: [
        {
          name: 'operation_version_ids',
          type: 'Vec<OperationsOperationVersionId>'
        },
        {
          name: 'offset',
          type: 'u64'
        },
        {
          name: 'limit',
          type: 'u16'
        },
        {
          name: 'at',
          type: 'Hash',
          isOptional: true
        }
      ],
      type: 'Vec<OperationsOperationVersion>'
    }
  },
  workflows: {
    getWorkflowsByIds: {
      description:
        'Get a subset of Workflows representing a page, given the full set of the ids to paginate and the pagination information',
      params: [
        {
          name: 'workflow_ids',
          type: 'Vec<WorkflowsWorkflowId>'
        },
        {
          name: 'offset',
          type: 'u64'
        },
        {
          name: 'limit',
          type: 'u16'
        },
        {
          name: 'at',
          type: 'Hash',
          isOptional: true
        }
      ],
      type: 'Vec<WorkflowsWorkflow>'
    },
    getWorkflowVersionsByIds: {
      description:
        'Get a subset of WorkflowVersions representing a page, given the full set of the ids to paginate and the pagination information',
      params: [
        {
          name: 'workflow_version_ids',
          type: 'Vec<WorkflowsWorkflowVersionId>'
        },
        {
          name: 'offset',
          type: 'u64'
        },
        {
          name: 'limit',
          type: 'u16'
        },
        {
          name: 'at',
          type: 'Hash',
          isOptional: true
        }
      ],
      type: 'Vec<WorkflowsWorkflowVersion>'
    }
  }
};
