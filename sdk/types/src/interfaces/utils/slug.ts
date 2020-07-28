interface Slug extends String {
  // so called "phantom-type", read more at: https://medium.com/@dhruvrajvanshi/advanced-typescript-patterns-6cf8826c7944
  __value__: never
}

export function parseSlug (str: string, maxLen?: number): Slug {
  if (maxLen !== null && maxLen !== undefined) {
    checkStrMaxLen(str, maxLen)
  }

  return (slugify(str) as unknown) as Slug
}

export function slugify (str: string): string {
  return str.toLowerCase().replace(/ /g, '_')
}

export function checkStrMaxLen (str: string, maxLen: number): void {
  if (str.length > maxLen) {
    // we can also trim the string here and not throw error
    throw new Error(`Given string is longer than allowed (${maxLen} chars)`)
  }
}

// /////////

// type StringOfLength<Min, Max> = string & {
//   __value__: never // this is the phantom type
// }

// // This is a type guard function which can be used to assert that a string
// // is of type StringOfLength<Min,Max>
// const isStringOfLength = <Min extends number, Max extends number>(
//   str: string,
//   min: Min,
//   max: Max
// ): str is StringOfLength<Min, Max> => str.length >= min && str.length <= max

// // type constructor function
// export const stringOfLength = <Min extends number, Max extends number>(
//   input: unknown,
//   min: Min,
//   max: Max
// ): StringOfLength<Min, Max> => {
//   if (typeof input !== 'string') {
//     throw new Error('invalid input')
//   }

//   if (!isStringOfLength(input, min, max)) {
//     throw new Error('input is not between specified min and max')
//   }

//   return input // the type of input here is now StringOfLength<Min,Max>
// }

// // Now we can use our type constructor function
// const myString = stringOfLength('hello', 1, 10) // myString has type StringOfLength<1,10>

// // the type constructor fails if the input is invalid
// stringOfLength('a', 5, 10) // Error: input is not between specified min and max

// // The phantom type prevents us from assigning StringOfLength manually like this:
// const a: StringOfLength<0, 10> = 'hello' // Type '"hello"' is not assignable to type { __value__: never }
