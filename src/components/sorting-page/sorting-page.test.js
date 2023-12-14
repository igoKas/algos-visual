import { Direction } from "../../types/direction";
import { bubbleSort, selectionSort } from "./utils";

describe('sorting test', () => {
    it('ascending bubbleSort empty arr', () => {
        expect(bubbleSort([], Direction.Ascending)).toStrictEqual([])
    })

    it('descending bubbleSort empty arr', () => {
        expect(bubbleSort([], Direction.Descending)).toStrictEqual([])
    })

    it('ascending selectionSort empty arr', () => {
        expect(selectionSort([], Direction.Ascending)).toStrictEqual([])
    })

    it('descending selectionSort empty arr', () => {
        expect(selectionSort([], Direction.Descending)).toStrictEqual([])
    })



    it('ascending bubbleSort arr with 1 element', () => {
        expect(bubbleSort([1], Direction.Ascending)).toStrictEqual([1])
    })

    it('descending bubbleSort arr with 1 element', () => {
        expect(bubbleSort([1], Direction.Descending)).toStrictEqual([1])
    })

    it('ascending selectionSort arr with 1 element', () => {
        expect(selectionSort([1], Direction.Ascending)).toStrictEqual([1])
    })

    it('descending selectionSort arr with 1 element', () => {
        expect(selectionSort([1], Direction.Descending)).toStrictEqual([1])
    })



    it('ascending bubbleSort arr with some elements', () => {
        expect(bubbleSort([5, 4, 6, 3, 7, 2, 8, 1, 9, 0], Direction.Ascending)).toStrictEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
    })

    it('descending bubbleSort arr with some elements', () => {
        expect(bubbleSort([5, 4, 6, 3, 7, 2, 8, 1, 9, 0], Direction.Descending)).toStrictEqual([9, 8, 7, 6, 5, 4, 3, 2, 1, 0])
    })

    it('ascending selectionSort arr with some elements', () => {
        expect(selectionSort([5, 4, 6, 3, 7, 2, 8, 1, 9, 0], Direction.Ascending)).toStrictEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
    })

    it('descending selectionSort arr with some elements', () => {
        expect(selectionSort([5, 4, 6, 3, 7, 2, 8, 1, 9, 0], Direction.Descending)).toStrictEqual([9, 8, 7, 6, 5, 4, 3, 2, 1, 0])
    })
})