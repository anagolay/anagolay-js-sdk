import { AnOperation } from '@anagolay/types'
import { stringCamelCase } from '@anagolay/util'

const specModule = (op: AnOperation): string => {
  const opName: string = stringCamelCase(op.data.name)

  return `import execute, {${opName}} from './module'
  
    describe('AnOperation: ${opName}', (): void => {
      it('is default defined', (): void => {
        expect(execute).toBeDefined()
      })
      
      it('is ${opName} defined', (): void => {
        expect(${opName}).toBeDefined()
      })
      
    })`
}

export default specModule
