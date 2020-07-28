export const defaultCreator = 'urn:pgp:d1f5e247a976f1e3c14f0a437a6db9962ef3978e'

// this should be written better, using advanced types
type opArrayBaseChildren = any[]
type opArrayBase = [string, opArrayBaseChildren[]]
// type opArrayBase = [string, [string[] | []]] | [string, []]
type opArray = opArrayBase[]
const ops: opArray = [
  ['meta_lens_serial_number', [['meta_serial_number', []]]],
  ['meta_lens_info', []],
  ['meta_lens_model', []]
]

export const lensRule = {
  version: 1,
  name: 'Sensio Lens rule',
  desc: 'Operations for Lens verification',
  creator: defaultCreator,
  forWhat: 3,
  ops
}

export const cameraRule = {
  version: 1,
  name: 'Sensio Camera rule',
  desc: 'Operations for Camera verification',
  creator: defaultCreator,
  forWhat: 2,
  ops: [
    ['meta_serial_number'], // this is the name of the param
    ['meta_make'],
    ['meta_model']
  ]
}

export const photoRule = {
  version: 1,
  name: 'Sensio Photo rule',
  desc: 'Rule for creating hashes and PoE for any Photo',
  creator: defaultCreator,
  forWhat: 1,
  ops: [
    ['metadata_hash', []],
    ['raw_pixels_hash', []],
    ['perceptual_hash', []],
    ['meta_document_id', []],
    ['meta_original_document_id', []],
    ['meta_date_time_original', []],
    ['meta_create_date', []],
    ['meta_copyright', []],
    ...cameraRule.ops,
    ...lensRule.ops
  ]
}
