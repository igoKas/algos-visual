import { Num } from "../components/sorting-page/sorting-page";
import { Char } from "../components/string/string";

export function wait(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

export const swap = (arr: Char[] | Num[], firstIndex: number, secondIndex: number): void => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
};