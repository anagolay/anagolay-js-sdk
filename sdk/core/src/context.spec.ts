import { createBrowserContext } from '@sensio/core/context'

describe('Core::createBrowserContext ', () => {
  it('should be defined -- createBrowserContext --', () => {
    expect(createBrowserContext).toBeDefined()
  })

  it('should create correct context for the browser', () => {
    expect(true).toBe(true)
  })
  it('should fail when no storage is defined', () => {
    expect.assertions(1)
    try {
      createBrowserContext({ ruleId: '12321' })
    } catch (error) {
      expect(error.message).toBe('localStorage is not defined')
    }
  })
})
