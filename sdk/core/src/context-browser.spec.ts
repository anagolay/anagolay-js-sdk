/**
 * @jest-environment jsdom
 */
import { createBrowserContext } from '@sensio/core/context'

jest.spyOn(window.localStorage.__proto__, 'setItem')
jest.spyOn(window.localStorage.__proto__, 'getItem')

describe('Core::createBrowserContext ', () => {
  it('should be defined -- createBrowserContext --', () => {
    expect(createBrowserContext).toBeDefined()
  })

  it('should work only in the browser mode', () => {
    const ctx = createBrowserContext({ ruleId: '12321' })
    expect(ctx).toHaveProperty('ruleId')
    expect(ctx).toHaveProperty('executor')
    expect(ctx.executor).toBeDefined()
  })
})
