import run from './index'

describe('Rule: PoCLO', (): void => {
  it('is default defined, run function', (): void => {
    expect(run).toBeDefined()
  })
  // it('should create the class', async (): Promise<void> => {
  //   const ruleInstance = await run()
  //   await ruleInstance.buildFlow()
  //   // console.log(await ruleInstance.getFlow()[0][0][0].default())
  //   const executor = ruleInstance.executeFlow()
  //   console.log(executor.next())
  //   // console.log(executor.next())
  //   // console.log(executor.next())
  //   // console.log(executor.next())
  //   // console.log(executor.next())
  //   // console.log(executor.next())

  //   expect(true).toBeTruthy()
  // })
})
