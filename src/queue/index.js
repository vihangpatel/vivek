import { DEBUG } from "../config";
import { watcher } from "../utils/index";
import { ERR_QUEUE } from "../utils/errors";

class QueueArray {
  constructor(props) {
    this.array = Array(props.size);
    this.front = null;
    this.rear = null;

    if (DEBUG) {
      watcher(this, { origin: "Queue" });
    }
  }

  insert(elem) {
    // overflow case
    if (
      this.rear - this.front === this.array.length - 1 ||
      this.front - this.rear === 1
    ) {
      throw ERR_QUEUE.OVERFLOW;
    }

    if (this.front === null && this.rear === null) {
      this.front = 0;
      this.rear = -1;
    }

    // put an element
    this.rear = (this.rear + 1) % this.array.length;
    this.array[this.rear] = elem;
    this.logger();
  }

  logger() {
    if (DEBUG) {
      console.log(
        "DEBUG: Query - front",
        this.front,
        " rear: ",
        this.rear,
        " array: ",
        [...this.array]
      );
    }
  }

  consume() {
    // if both the pointers are at same position
    if (this.front === null) {
      throw ERR_QUEUE.UNDERFLOW;
    }

    const elem = this.array[this.front];

    this.array[this.front] = null;

    if (this.rear === this.front) {
      this.rear = this.front = null;
    } else {
      this.front = (this.front + 1) % this.array.length;
    }

    this.logger();
    return elem;
  }
}

export default QueueArray;
