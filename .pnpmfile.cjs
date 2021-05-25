const ops = {
  '@anagolay/op-create-qrcode': 'workspace:*',
  '@anagolay/op-enc-hex': 'workspace:*',
  '@anagolay/op-file': 'workspace:*',
  '@anagolay/op-identity': 'workspace:*',
  '@anagolay/op-json-dec': 'workspace:*',
  '@anagolay/op-json-enc': 'workspace:*',
  '@anagolay/op-match-all': 'workspace:*',
  '@anagolay/op-match-none': 'workspace:*',
  '@anagolay/op-multihash': 'workspace:*',
  '@anagolay/op-split': 'workspace:*',
  '@anagolay/op-cid': 'workspace:*',
  '@anagolay/op-image-metadata': 'workspace:*',
  '@anagolay/op-image-phash': 'workspace:*',
  '@anagolay/op-image-metadata-hash': 'workspace:*',
  '@anagolay/op-image-raw-pixels': 'workspace:*',
  '@anagolay/op-take-photo-and-upload-qrcode': 'workspace:*',
  '@anagolay/op-create-ownership-claims': 'workspace:*',
  '@anagolay/op-image-raw-pixels-hash': 'workspace:*',
  '@anagolay/op-user-sign-claims': 'workspace:*',
  '@anagolay/op-save-statements': 'workspace:*',
}

function readPackage(pkg) {
  // this is how we can add the all operations to the our other packages. be careful to add them to packages if needed, not they are only liked
  // if (!pkg.name.startsWith('@anagolay/op-')) {
  //   pkg.devDependencies = {
  //     ...pkg.devDependencies,
  //     ...ops,
  //   }
  // }
  return pkg
}

module.exports = {
  hooks: {
    readPackage,
  },
}
