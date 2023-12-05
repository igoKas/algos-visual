import { Direction } from "../../types/direction";
import { swap } from "../../utils/utils";

export const bubbleSort = (arr: number[], direction: Direction) => {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (direction === Direction.Ascending ? arr[j] > arr[j + 1] : arr[j] < arr[j + 1]) {
                swap(arr, j, j + 1);
            }
        }
    }
    return arr
}

export const selectionSort = (arr: number[], direction: Direction) => {
    for (let i = 0; i < arr.length; i++) {
        let min = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (direction === Direction.Ascending ? arr[min] > arr[j] : arr[min] < arr[j]) {
                min = j;
            }
        }
        swap(arr, i, min);
    }
    return arr
}
