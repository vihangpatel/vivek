import LinkedList from "../linked-list";
import { ERR_QUEUE } from "../utils/errors";

class QueueLinkedList {
  constructor() {
    this.queue = new LinkedList();
  }

  insert(elem) {
    try {
      return this.queue.insert(elem);
    } catch (e) {
      throw [ERR_QUEUE.OVERFLOW, e];
    }
  }

  consume() {
    try {
      return this.queue.consume("start").value;
    } catch (e) {
      throw [ERR_QUEUE.UNDERFLOW, e];
    }
  }
}

export default QueueLinkedList;
