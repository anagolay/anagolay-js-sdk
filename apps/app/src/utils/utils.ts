/**
 * Remove the idem from the array using the `Array.filter` function.
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
export function removeItemFromArray(array: any[], itemToRemove: any) {
  const newArray = array.filter((element) => {
    return element !== itemToRemove;
  });
  return newArray;
}
