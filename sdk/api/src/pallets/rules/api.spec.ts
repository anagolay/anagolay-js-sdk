import {
  createSubmittableExtrinsic,
  createSubmittableExtrinsics,
  getAll,
  getAllDecoded,
  save,
  saveBulk,
} from './api'

describe('pallet::rules::api::definitions', () => {
  it('should be defined :: save', () => {
    expect(save).toBeDefined()
  })
  it('should be defined :: saveBulk', () => {
    expect(saveBulk).toBeDefined()
  })

  it('should be defined :: getAll', () => {
    expect(getAll).toBeDefined()
  })
  it('should be defined :: getAllDecoded', () => {
    expect(getAllDecoded).toBeDefined()
  })
  it('should be defined :: createSubmittableExtrinsic', () => {
    expect(createSubmittableExtrinsic).toBeDefined()
  })
  it('should be defined :: createSubmittableExtrinsics', () => {
    expect(createSubmittableExtrinsics).toBeDefined()
  })
})
