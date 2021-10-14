class Stack {
  #size;
  #maxSize;
  #head;

  constructor(maxSize = 10) {
    if (!Number.isSafeInteger(maxSize) || maxSize <= 0)
      throw new Error("Invalid max size or iterable length for the stack!");
    this.#maxSize = maxSize;
    this.#size = 0;
    this.#head = null;

    this.isEmpty = () => this.#size === 0;

    this.push = (data) => {
      if (this.#size === this.#maxSize) throw new Error("Stack overflow!");
      let newHead = Object.create(null);
      newHead.data = data;
      newHead.next = this.#head;
      this.#head = newHead;
      this.#size += 1;
    };

    this.pop = () => {
      if (this.#size === 0) throw new Error("Stack is empty!");
      let data = this.#head.data;
      this.#head = this.#head.next;
      this.#size -= 1;
      return data;
    };

    this.peek = () => {
      if (this.#size === 0) return null;

      let data = this.pop();
      this.push(data);
      return data;
    };

    this.toArray = () => {
      if (this.#size === 0) return [];
      let arr = [];
      let curHead = this.#head;
      for (let i = 1; i <= this.#size; i++) {
        arr[this.#size - i] = curHead.data;
        curHead = curHead.next;
      }
      return arr;
    };
  }

  static fromIterable(iter) {
    if (typeof iter?.[Symbol.iterator] !== "function")
      throw new Error("The argument must be an interable!");
    let stack = new Stack(iter.length);
    for (let val of iter) {
      stack.push(val);
    }
    return stack;
  }
}

class LinkedList {
  #head;
  #tail;

  constructor() {
    this.#head = Object.create(null);
    this.#tail = Object.create(null);
    this.#tail.prev = null;
    this.#head.next = null;
    this.#head.prev = this.#tail;
    this.#tail.next = this.#head;

    this.append = (data) => {
      if (!("data" in this.#head)) {
        this.#head.data = data;
      } else {
        let newHead = Object.create(null);
        newHead.data = data;
        newHead.prev = this.#head;
        newHead.next = null;
        this.#head.next = newHead;
        this.#head = newHead;
      }
    };

    this.prepend = (data) => {
      if (!("data" in this.#tail)) {
        this.#tail.data = data;
      } else {
        let newTail = Object.create(null);
        newTail.data = data;
        newTail.next = this.#tail;
        newTail.prev = null;
        this.#tail.prev = newTail;
        this.#tail = newTail;
      }
    };

    this.toArray = () => {
      const isHeadEmpty = !("data" in this.#head);
      const isTailEmpty = !("data" in this.#tail);

      if (isHeadEmpty && isTailEmpty) return [];

      let arr = [];
      let cur = isTailEmpty ? this.#tail.next : this.#tail;

      for (let i = 0; cur !== null && "data" in cur; i++) {
        arr[i] = cur.data;
        cur = cur.next;
      }
      return arr;
    };

    this.find = (data) => {
      let cur = this.#tail;

      while (cur !== null) {
        if (cur?.data === data) return data;
        cur = cur.next;
      }
      return null;
    };
  }

  static fromIterable(iter) {
    if (typeof iter?.[Symbol.iterator] !== "function" || iter.length <= 0)
      throw new Error("The argument must be an interable of positive length!");

    let list = new LinkedList();
    for (let val of iter) {
      list.append(val);
    }
    return list;
  }
}
