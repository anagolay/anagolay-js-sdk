import { find, pathEq } from 'ramda'

import ops from '../../../fixtures/allOperations'
import interfacesTpl, { generateInputParamList, generateInputParams } from './interfacesTpl'

describe('templates::interfaces', () => {
  it('should be defined', () => {
    expect(generateInputParams).toBeDefined()
    expect(generateInputParamList).toBeDefined()
    expect(interfacesTpl).toBeDefined()
  })
  it('should create correct input interface', () => {
    const matchAll = find(pathEq(['data', 'name'], 'match_all'))(ops)
    const generated1 = generateInputParams(matchAll.data)

    expect(generated1).toEqual('export type InputParams = AnInputParamsImplementation [ ]')

    const cid = find(pathEq(['data', 'name'], 'cid'))(ops)
    const generated2 = generateInputParams(cid.data)

    expect(generated2).toEqual('export type InputParams = [ InputParam0 ]')
  })
})
