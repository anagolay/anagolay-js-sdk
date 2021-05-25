import execute, { config, takePhotoAndUploadQrcode } from '.'

describe('AnOperation: takePhotoAndUploadQrcode.index', (): void => {
  it('is default defined', (): void => {
    expect(execute).toBeDefined()
  })
  it('is takePhotoAndUploadQrcode defined', (): void => {
    expect(takePhotoAndUploadQrcode).toBeDefined()
  })
  it('is config defined', (): void => {
    expect(config).toBeDefined()
  })
})
