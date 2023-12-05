interface IStack<T> {
    push: (item: T) => void;
    pop: () => void;
}

export class Stack<T> implements IStack<T> {
    private container: T[] = [];

    push = (item: T): void => {
        this.container.push(item)
    };

    pop = (): void => {
        if (this.size) this.container.pop();
    };

    clear = () =>  {
        this.container = [];
    };

    get size() {return this.container.length};

    get elements() {return this.container};
}