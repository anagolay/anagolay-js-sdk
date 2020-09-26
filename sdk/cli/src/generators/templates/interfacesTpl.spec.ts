import { find, pathEq } from 'ramda'
import ops from '../../fixtures/ops'
import interfacesTpl, { generateInputParamList, generateInputParams } from './interfacesTpl'

describe('templates::interfaces', () => {
  it('should be defined', () => {
    expect(generateInputParams).toBeDefined()
    expect(generateInputParamList).toBeDefined()
    expect(interfacesTpl).toBeDefined()
  })
  it('should create correct input interface', () => {
    const snMatchAll = find(pathEq(['data', 'name'], 'sn_match_all'))(ops)
    const generated1 = generateInputParams(snMatchAll.data)
    expect(generated1).toEqual('export type InputParams = SnInputParamsImplementation [ ]')

    const snCid = find(pathEq(['data', 'name'], 'sn_cid'))(ops)
    const generated2 = generateInputParams(snCid.data)

    expect(generated2).toEqual('export type InputParams = [ InputParam0 ]')
  })
})
