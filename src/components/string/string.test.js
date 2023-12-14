import { reverse } from "./utils";

describe('reverse string test', () => {
    it('reverse with even number of chars', () => {
        expect(reverse('abde')).toBe('edba')
    })

    it('reverse with odd number of chars', () => {
        expect(reverse('abcde')).toBe('edcba')
    })

    it('reverse with one char', () => {
        expect(reverse('a')).toBe('a')
    })

    it('reverse empty string', () => {
        expect(reverse('')).toBe('')
    })
})