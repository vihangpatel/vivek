import Node from "./node";
import { ERR_LINKED_LIST } from "../utils/errors";
import { DEBUG } from "../config";

class LinkedList {
  constructor() {
    this.head = null;
  }

  insert = elem => this.append(elem);

  append(elem) {
    // no memory constraint over here in JS
    // @TODO: implement
    const nodeElem = new Node({ value: elem, nextPtr: null });

    // if first node
    if (this.head === null) {
      this.head = nodeElem;
    } else {
      let tempPtr = this.head;
      // iterate untill last node is reached
      while (tempPtr.nextPtr) {
        tempPtr = tempPtr.nextPtr;
      }

      tempPtr.nextPtr = nodeElem;
    }

    this.logger();
  }

  prepend(elem) {
    // no memory constraint over here in JS
    // @TODO: implement
    const nodeElem = new Node({ elem, nextPtr: null });

    // if it is the first node
    if (this.head === null) {
      this.head = nodeElem;
    } else {
      nodeElem.nextPtr = this.head;
      this.head = nodeElem;
    }

    this.logger();
  }

  consume(position = "end") {
    if (!this.head) {
      throw ERR_LINKED_LIST.EMPTY_LINKED_LIST;
    }

    let nodeElem = null;

    switch (position) {
      case "start": {
        nodeElem = this.head;
        // Point to next node
        this.head = this.head.nextPtr;
        // detach the pointer from the linked list
        nodeElem.nextPtr = null;
        break;
      }
      case "end": {
        let tempPtr = this.head;
        // iterate untill last node is reached
        while (tempPtr.nextPtr && tempPtr.nextPtr.nextPtr) {
          tempPtr = tempPtr.next;
        }

        // tempPtr will be second last element
        nodeElem = tempPtr.nextPtr;
        // terminate linked list
        tempPtr.nextPtr = null;
        break;
      }
      default:
        void 0;
    }

    this.logger();
    return nodeElem;
  }

  toArray() {
    const arr = [];
    // backup pointer for iteration
    let tempPtr = this.head;

    while (tempPtr) {
      arr.push(tempPtr.value);
      tempPtr = tempPtr.nextPtr;
    }

    return arr;
  }

  logger() {
    if (DEBUG) {
      console.log("LINKED_LIST: ", this.toArray());
    }
  }
}

export default LinkedList;
