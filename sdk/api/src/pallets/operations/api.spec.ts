import {
  createNetworkTx,
  getAll,
  getAllDecoded,
  save,
  saveOperationsBulk
} from './api'
describe('pallet::operation::api::definitions', () => {
  it('should be defined :: save', () => {
    expect(save).toBeDefined()
  })
  it('should be defined :: saveOperationsBulk', () => {
    expect(saveOperationsBulk).toBeDefined()
  })
  it('should be defined :: getAll', () => {
    expect(getAll).toBeDefined()
  })
  it('should be defined :: getAllDecoded', () => {
    expect(getAllDecoded).toBeDefined()
  })
  it('should be defined :: createNetworkTx', () => {
    expect(createNetworkTx).toBeDefined()
  })
})

describe('pallet::operation::api::cases', () => {
  it.skip('should fail when not connected ', () => {
    expect(true).toBeTruthy()
  })
})
