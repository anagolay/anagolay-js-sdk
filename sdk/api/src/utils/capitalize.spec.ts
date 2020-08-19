import capitalize from './capitalize'
describe('utils:: capitalize', () => {
  it('is defined', () => {
    expect(capitalize).toBeDefined()
  })
  it('should make capital case', () => {
    expect(capitalize('yo')).toEqual('Yo')
  })
})
