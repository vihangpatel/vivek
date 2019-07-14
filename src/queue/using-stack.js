// Queue using 2 stacks
class QueueUsingStacks {
  constructor() {
    this.stack1 = [];
    this.stack2 = [];
  }

  insert(elem) {
    this.stack1.push(elem);
    return true;
  }

  consume() {
    if (this.stack2.length === 0) {
      while (this.stack1.length) {
        this.stack2.push(this.stack1.pop());
      }
      return this.stack2.pop();
    } else {
      return this.stack2.pop();
    }
  }
}

export default QueueUsingStacks;
