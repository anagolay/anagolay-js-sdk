const crypto = require('crypto')

Object.defineProperty(global.self, 'crypto', {
  value: {
    getRandomValues: (arr) =>
      crypto.randomBytes(arr.length).reduce((arr, value, index) => {
        arr[index] = value

        return arr
      }, arr),
  },
})
