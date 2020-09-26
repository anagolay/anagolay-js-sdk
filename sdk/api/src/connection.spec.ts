import setupConnection, { getApi } from './connection'

describe('api::connection ', () => {
  it('should be defined, setupConnection', () => {
    expect(setupConnection).toBeDefined()
  })
  it('should be defined, getApi', () => {
    expect(getApi).toBeDefined()
  })

  it('should fail on no api instance', (): void => {
    expect.assertions(1)

    try {
      getApi()
    } catch (error) {
      expect(error.message).toContain('Please init the api instance first')
    }
  })
  it.skip('should return correct api instance', async (): Promise<void> => {
    expect(true).toBe(true)
  })
})
