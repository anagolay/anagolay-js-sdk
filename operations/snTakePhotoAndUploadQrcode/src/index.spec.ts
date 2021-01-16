import execute, { snTakePhotoAndUploadQrcode, config } from '.'

describe('SnOperation: snTakePhotoAndUploadQrcode', (): void => {
  it('is default defined', (): void => {
    expect(execute).toBeDefined()
  })
  it('is snTakePhotoAndUploadQrcode defined', (): void => {
    expect(snTakePhotoAndUploadQrcode).toBeDefined()
  })
  it('is config defined', (): void => {
    expect(config).toBeDefined()
  })
})
