export const fib = (n: number) => {
    const arr = [];
    if (n > 0) {
        arr.push(1);
    }
    if (n > 1) {
        arr.push(1);
    }
    if (n > 2) {
        for (let i = 2; i <= n; i++) {
            arr.push(arr[i - 2] + arr[i - 1]);
        }
    }
    return arr;
}