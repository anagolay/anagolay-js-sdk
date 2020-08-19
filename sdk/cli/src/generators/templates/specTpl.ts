import { stringCamelCase } from '@polkadot/util'
import { SnOperation } from '@sensio/types'

const spec = (op: SnOperation): string => {
  const opName: string = stringCamelCase(op.data.name)
  return `import ${opName} from '.'
  
    describe('SnOperation: ${opName}', (): void => {
      it('is defined', (): void => {
        expect(${opName}).toBeDefined()
      })
      it('should be 42', async (): Promise<void> => {
        const ft = await new Promise(resolve => resolve(42))
        expect(ft).toEqual(42)
      })
    })`
}

export default spec
