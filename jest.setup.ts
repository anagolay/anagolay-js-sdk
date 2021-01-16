import { disconnect, setupConnection } from '@sensio/api/connection'

beforeAll(() => {
  // console.log('global beforeAll')
  // Drop database before running tests
  return setupConnection()
}, 7000)

afterAll(() => {
  // console.log('global afterAll')
  return disconnect()
})
