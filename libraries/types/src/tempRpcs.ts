export default {
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
