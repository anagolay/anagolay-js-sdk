import { AnOperation } from '@anagolay/types'
import { stringCamelCase } from '@anagolay/util'

const specIndex = (op: AnOperation): string => {
  const opName: string = stringCamelCase(op.data.name)

  return `import execute, {${opName}, config} from '.'
  
    describe('AnOperation: ${opName}', (): void => {
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
