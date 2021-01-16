import setupConnection, { getApi, disconnect } from './connection'

describe('api::connection ', () => {
  it('should be defined, setupConnection', () => {
    expect(setupConnection).toBeDefined()
  })
  it('should be defined, getApi', () => {
    expect(getApi).toBeDefined()
  })

  it('should fail on no api instance', async (): Promise<void> => {
    expect.assertions(1)
    await disconnect()
    try {
      getApi()
    } catch (error) {
      expect(error.message).toContain(
        'Please init the api instance first, usually that would be *api.api()*',
      )
    }
  })
  it.skip('should return correct api instance', async (): Promise<void> => {
    expect(true).toBe(true)
  })
})
