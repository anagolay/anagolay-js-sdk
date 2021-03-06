/**
 * Remove the idem from the array using the `Array.filter` function.
 *
 * @remarks Pure function
 *
 * @param array
 * @param itemToRemove
 * @returns New array without the item
 *
 * Example:
 * ```js
 * removeFromArray([1,2,3,4], 3)
 * // [1,2,4]
 * ```
 */
export function removeItemFromArray(array: any[], itemToRemove: any): any[] {
  const newArray = array.filter((element) => {
    return element !== itemToRemove;
  });
  return newArray;
}
