import { readFileSync } from 'fs'
import { resolve } from 'path'
import snFile from '.'
describe('Operation: snFile', (): void => {
  it('is defined', (): void => {
    expect(snFile).toBeDefined()
  })
  it('is should return proper file', async (): Promise<void> => {
    const path = resolve(__dirname, './index.ts')
    const file = readFileSync(path)
    const s = await snFile([
      {
        data: resolve(__dirname, './index.ts'),
        decode: () => resolve(__dirname, './index.ts'),
      },
    ])

    expect(s.data.length).toBe(file.length)
    expect(s.decode()).toEqual(file)
  })
})
