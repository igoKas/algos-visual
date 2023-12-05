import { ElementStates } from "../../types/element-states";

interface IQueue<T> {
    enqueue: (item: T) => void;
    dequeue: () => void;
    
}

export class Queue<T> implements IQueue<T> {
    private container: (T)[] = [];
    private head = 0;
    private tail = 0;
    private readonly size: number = 0;
    private length: number = 0;

    constructor(size: number) {
        this.size = size;
        for (let i = 0; i < size; i++) {
            this.container.push({} as T);
        }
    }

    enqueue = (item: T) => {
        if (this.length >= this.size) {
            throw new Error("Maximum length exceeded");
        }
        this.container[this.tail % this.size] = item;
        this.tail++;
        this.length++;
    };

    dequeue = () => {
        if (this.isEmpty()) {
            throw new Error("No elements in the queue");
        }

        this.container[this.head % this.size] = {} as T;
        this.head++;
        this.length--;
    };

    clear = () => {
        this.container = [];
        for (let i = 0; i < this.size; i++) {
            this.container.push({} as T);
        }
        this.head = 0;
        this.tail = 0;
        this.length = 0;
    }

    isEmpty = () => this.length === 0;

    getHead() {return this.head};

    getTail() {return this.tail};

    getLength() {return this.length};

    get elements() {return this.container};

}
