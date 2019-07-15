import DoubleLinkNode from "../linked-list/double-node";

const defaultHandler = ({ value }) => console.log(value);

class Tree {
  constructor() {
    this.root = null;
  }

  inOrder(ptr = this.head, handler = defaultHandler) {
    if (!ptr) {
      return false;
    }
    // Call the left child recursively
    this.inOrder(ptr.left, handler);
    // Process root node
    if (ptr.value) {
      typeof handler === "function" && handler({ value: ptr.value });
    }
    // Call the right child recursively
    this.inOrder(ptr.right, handler);
  }

  preOrder(ptr = this.head, handler = defaultHandler) {
    if (!ptr) {
      return false;
    }
    // Process root node
    if (ptr.value) {
      typeof handler === "function" && handler({ value: ptr.value });
    }
    // Call the left child recursively
    this.inOrder(ptr.left, handler);
    // Call the right child recursively
    this.inOrder(ptr.right, handler);
  }

  postOrder(ptr = this.head, handler = defaultHandler) {
    if (!ptr) {
      return false;
    }
    // Call the left child recursively
    this.inOrder(ptr.left, handler);
    // Call the right child recursively
    this.inOrder(ptr.right, handler);
    // Process root node
    if (ptr.value) {
      typeof handler === "function" && handler({ value: ptr.value });
    }
  }

  levelOrder(ptr = this.head, handler = defaultHandler) {
    if (!ptr) {
      return false;
    }

    const stack = [ptr];

    while (stack.length > 0) {
      const poppedPtr = stack.pop();
      typeof handler === "function" && handler({ value: poppedPtr.value });
      poppedPtr.left && poppedPtr.push(poppedPtr.left);
      poppedPtr.right && poppedPtr.push(poppedPtr.right);
    }
  }

  preOrderWithoutRecursion(ptr = this.head, handler = defaultHandler) {
    if (!ptr) {
      return false;
    }

    const stack = [ptr];

    while (stack.length) {
      const poppedPtr = stack.pop();
      typeof handler === "function" && handler({ value: poppedPtr.value });
      // in level order, first left then right pointers are pushed
      poppedPtr.right && poppedPtr.push(poppedPtr.right);
      poppedPtr.left && poppedPtr.push(poppedPtr.left);
    }
  }

  inorderWithoutRecursion(ptr = this.head, handler = defaultHandler) {
    if (!ptr) {
      return false;
    }

    const stack = [];

    while (stack.length) {
      while (ptr) {
        // process the left subtree first
        stack.push(ptr);
        ptr = ptr.left;
      }
      ptr = stack.pop();
      typeof handler === "function" && handler({ value: ptr.value });
      // Now point to the right tree to further evaluate tree
      ptr = ptr.right;
    }
  }

  postorderWithoutRecursion(ptr = this.head, handler = defaultHandler) {
    if (!ptr) {
      return false;
    }

    const stack = [];
    while (stack.length) {
      while (ptr) {
        stack.push(ptr);
        ptr = ptr.left;
      }
      if (!stack[stack.length - 1].right) {
        ptr = stack.pop();
        typeof handler === "function" && handler({ value: ptr.value });
        if (ptr === stack[stack.length - 1].right) {
          typeof handler === "function" && handler({ value: ptr.value });
          stack.pop();
        }

        ptr = stack[stack.length - 1].right;
      }
    }
  }

  insert() {}

  delete() {}

  destroy(ptr = this.head, handler = defaultHandler) {
    if (!ptr) {
      return false;
    }

    // Destroy left tree
    this.destroy(ptr.left);
    // Destroy right tree
    this.destroy(ptr.right);
    typeof handler === "function" && handler(ptr.value);

    // Destroy current node
    ptr = null;
    return true;
  }

  getDepth(ptr = this.head) {
    if (!ptr) {
      return 0;
    }

    if (!ptr.left && !ptr.right) {
      return 1;
    }

    const leftTreeDepth = this.getDepth(ptr.left);
    const rightTreeDepth = this.getDepth(ptr.right);

    return Math.max(leftTreeDepth, rightTreeDepth) + 1;
  }
}

export default Tree;
