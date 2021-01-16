import { stringCamelCase } from '@polkadot/util'
import { SnOperation } from '@sensio/types'

const specIndex = (op: SnOperation): string => {
  const opName: string = stringCamelCase(op.data.name)
  return `import execute, {${opName}, config} from '.'
  
    describe('SnOperation: ${opName}', (): void => {
      it('is default defined', (): void => {
        expect(execute).toBeDefined()
      })
      it('is ${opName} defined', (): void => {
        expect(${opName}).toBeDefined()
      })
      it('is config defined', (): void => {
        expect(config).toBeDefined()
      })
      
    })`
}

export default specIndex
