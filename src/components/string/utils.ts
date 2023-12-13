import { swap } from "../../utils/utils";

export const reverse = (str: string) => {
  const arr = str.split('');
  let arrLength = arr.length;
  let left = 0;
  let right = arrLength - 1;
  while (left < right) {
    swap(arr, left, right);
    left++;
    right--;
  }
  return arr.join('')
}