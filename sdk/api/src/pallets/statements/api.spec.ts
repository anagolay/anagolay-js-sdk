import {
  createSubmittableExtrinsicOfCopyright,
  createSubmittableExtrinsicOfOwnership,
  createSubmittableExtrinsicRevoke,
  getAll,
  getAllDecoded,
  saveCopyright,
  saveCopyrightsBulk,
  saveOwnership,
  saveOwnershipsBulk,
} from './api'

describe('pallet::statement::api::definitions', () => {
  it('should be defined :: saveCopyright', () => {
    expect(saveCopyright).toBeDefined()
  })
  it('should be defined :: saveOwnership', () => {
    expect(saveOwnership).toBeDefined()
  })
  it('should be defined :: saveOwnershipsBulk', () => {
    expect(saveOwnershipsBulk).toBeDefined()
  })
  it('should be defined :: saveCopyrightsBulk', () => {
    expect(saveCopyrightsBulk).toBeDefined()
  })
  it('should be defined :: getAll', () => {
    expect(getAll).toBeDefined()
  })
  it('should be defined :: getAllDecoded', () => {
    expect(getAllDecoded).toBeDefined()
  })
  it('should be defined :: createSubmittableExtrinsicOfCopyright', () => {
    expect(createSubmittableExtrinsicOfCopyright).toBeDefined()
  })
  it('should be defined :: createSubmittableExtrinsicOfOwnership', () => {
    expect(createSubmittableExtrinsicOfOwnership).toBeDefined()
  })
  it('should be defined :: createSubmittableExtrinsicRevoke', () => {
    expect(createSubmittableExtrinsicRevoke).toBeDefined()
  })
})
