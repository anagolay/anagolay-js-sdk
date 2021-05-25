import { AnGenericId, AnRule, AnRuleData } from '@anagolay/types'

/**
 * Abstract Rule class, ALL rules must implement this class
 * @NOTE also this is testing for the different approach, Operations might benefit from this
 */
export default abstract class BaseRule {
  private ruleId: AnGenericId
  private data: AnRuleData
  private flow: (string | string[])[][]

  constructor(config: AnRule) {
    this.ruleId = config.id
    this.data = config.data
    this.flow = []
  }
  /**
   * Return rule id
   */
  getRuleId(): AnGenericId {
    return this.ruleId
  }
  /**
   * Return the rule data
   */
  getData(): AnRuleData {
    return this.data
  }
  /**
   * Set the flow param
   * @param flow
   */
  setFlow(flow: (string | string[])[][]): void {
    this.flow = flow
  }
  /**
   * Set the flow param
   * @param flow
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getFlow(): any[] {
    return this.flow
  }
  /**
   * Build the execution flow
   * @TODO && @FUCK implement this to be automated. do it manually atm
   *```ts
  export type PrepOpsForExec = Array<string[] | [string[]]>;

  const execOpFlowArray: PrepOpsForExec = [
  // Segment 1 --  block  before the User Interaction op
  ['cid', 'create_qr_code'],
  // Segment 2 --  user interaction block
  ['take_photo_and_upload_qrcode'], // take_photo_and_upload_qrcode(generateQrCodeOutput)
  // Segment 3 --  block  after the User Interaction op
  [['input', 'cid'], 'match_all', 'prepare_ownership_statements'],
  // Segment 4 -- user interaction block
  ['user_sign'],
  // Segment 5 -- non user interaction block
  ['input', 'save_statements'],
];
   */
  // async buildFlow(): Promise<string[][]> {
  //   const flow: any[] = []
  //   /**
  //    * Visit the Operation ref and get the npm and executable array
  //    * @param op
  //    */
  //   async function visit(op: AnOperationReference): Promise<string> {
  //     const { id, children } = op
  //     const { name } = find(propEq('id', id))(operationNamesWithIds) as OperationNameId
  //     const processedChildren = await Promise.all(children.map(async (o) => await visit(o)))

  //     const operationconfig = await import(name + '/config')
  //     console.log(processedChildren, name, operationconfig)
  //     return name
  //   }

  //   const { ops } = this.data

  //   await Promise.all(ops.map(async (o) => await visit(o)))

  //   return flow
  // }
  abstract buildFlow(): Promise<(string | string[])[][]>

  /**
   * Execute the flow
   * 
   * This is the generator function and it should be ran as until the `done===true`. Current implementation will require `this.flow.length + 1` amount of executions
   *
   * EXAMPLE:
   * ```ts
    const ruleInstance = await run()
    await ruleInstance.buildFlow()
    const executor = ruleInstance.executeFlow()
    console.log(executor.next())
    console.log(executor.next())
    console.log(executor.next())
    console.log(executor.next())
    console.log(executor.next())
    console.log(executor.next())

   * ```
   */
  *executeFlow(): IterableIterator<(string | string[])[]> {
    let iterationCount = 0

    // eslint-disable-next-line no-loops/no-loops
    for (let i = 0; i < this.flow.length; i += 1) {
      iterationCount++
      yield this.flow[i]
    }

    return iterationCount
  }
}
