import { Num } from "../components/sorting-page/sorting-page";
import { Char } from "../components/string/string";

export function wait(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

export const swap = (arr: Char[] | Num[] | string[] | number[], firstIndex: number, secondIndex: number): void => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
};

export const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }