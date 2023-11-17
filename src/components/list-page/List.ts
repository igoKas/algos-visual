export class LinkedListNode<T> {
    value: T
    next: LinkedListNode<T> | null
    constructor(value: T, next?: LinkedListNode<T> | null) {
        this.value = value;
        this.next = (next === undefined ? null : next);
    }
}

interface ILinkedList<T> {
    prepend: (element: T) => void;
    append: (element: T) => void;
    addByIndex: (element: T, index: number) => void;
    deleteByIndex: (index: number) => void;
    deleteHead: () => void;
    deleteTail: () => void;
    toArray: () => T[];
    getSize: () => number;
    getHead: () => LinkedListNode<T> | null;
    getTail: () => LinkedListNode<T> | null;
}

export class LinkedList<T> implements ILinkedList<T> {
    private head: LinkedListNode<T> | null;
    private tail: LinkedListNode<T> | null;
    private size: number;
    constructor(elements: T[]) {
        this.head = null;
        this.tail = null;
        this.size = 0;
        elements.forEach(element => this.append(element));
    }

    prepend(element: T) {
        const node = new LinkedListNode(element);
        if (!this.tail) this.tail = node;

        node.next = this.head;
        this.head = node;

        this.size++;

        return node;
    }

    append(element: T) {
        const node = new LinkedListNode(element);
        if (!this.head) this.head = node;
        if (!this.tail) this.tail = node;
        this.tail.next = node;
        this.tail = node;

        this.size++;
        return node;
    }

    addByIndex(element: T, index: number) {
        if (index < 0 || index > this.size) {
            return
        }

        let node = new LinkedListNode(element);

        if (index === 0) {
            node.next = this.head;
            this.head = node;
        } else {
            let current = this.head;
            let currIndex = 0;

            while (currIndex < index - 1 && current) {
                current = current.next;
                currIndex++;
            }

            if (current) {
                node.next = current.next;
                current.next = node;
            }
        }
        this.size++;

        return node
    }

    deleteByIndex(index: number) {
        if (index < 0 || index > this.size) {
            return 'Incorrect value of position';
        }
    
        let current = this.head;
    
        if (index === 0 && current) {
            this.head = current.next;
        } else {
            let prev = null;
            let currIndex = 0;
    
            while(currIndex < index && current) {
                prev = current;
                current = current.next;
                currIndex++;
            }
    
            if (current && prev) prev.next = current.next; 
        }
    
        this.size--;
    }

    deleteHead() {
        if (!this.head) {
            return null;
        }

        if (this.head.next) {
            this.head = this.head.next;
        } else {
            this.head = null;
            this.tail = null;
        }
        this.size--;
    }

    deleteTail() {
        if (!this.tail) {
            return null;
        }

        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
        }

        let currentNode = this.head;
        while (currentNode?.next) {
            if (!currentNode.next.next) {
                currentNode.next = null;
            } else {
                currentNode = currentNode.next;
            }
        }
        this.tail = currentNode;
        this.size--;
    }

    toArray() {
        let curr = this.head;
        let res = [];
        while (curr) {
            res.push(curr.value);
            curr = curr.next;
        }
        return res;
    }

    getSize() { return this.size }

    getHead() { return this.head }

    getTail() { return this.tail }
}