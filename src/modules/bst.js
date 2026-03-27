class Node {
  constructor(data = null) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    const set = new Set(array);
    this.arr = Array.from(set).sort((a, b) => a-b);
    this.root = this.#buildTree();
  }
  
  #buildTree(array = this.arr) {
    return fun(array, 0, array.length-1);
    
    function fun(arr, start, end) {
      if (start > end) return null;

      const mid = Math.floor((start + end) / 2);
      const root = new Node( arr[mid] );
  
      root.left = fun(arr, start, mid-1);
      root.right = fun(arr, mid+1, end);

      return root;
    }
  }

  includes(value) {
    let current = this.root;

    while (current) {
      if (current.data === value) return true;
      current = (current.data > value) ? current.left : current.right;
    }

    return false;
  }

  insert(value, root = this.root) {
    if (!root) {
      const newNode = new Node(value);
      if (!this.root) this.root = newNode;
      return newNode;
    }

    if (value < root.data) {
      root.left = this.insert(value, root.left);
    } else if (value > root.data) {
      root.right = this.insert(value, root.right);
    }

    return root;
  }

  deleteItem(value) {
    this.root = fun(value, this.root);

    function fun(value, root) {
      if (!root) return null;
  
      if (value < root.data) {
        root.left = fun(value, root.left);
      } else if (value > root.data) {
        root.right = fun(value, root.right);
      } else {
        if (!root.left) return root.right;
        if (!root.right) return root.left;

        root.data = getMin(root.right);
        root.right = fun(root.data, root.right);
      }
  
      return root;
    }

    function getMin(node) {
      let min = node.data;
      while (node.left) {
        min = node.left.data;
        node = node.left;
      }
      return min;
    }
  }

  levelOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("callback is required!");
    }
    if (!this.root) return;
    
    let queue = [this.root];

    while (queue.length) {
      const node = queue.shift();

      callback(node.data);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  inOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("callback is required!");
    }

    fun(this.root);

    function fun(root) {
      if (!root) return;

      fun(root.left);
      callback(root.data);
      fun(root.right);
    }
  }

  preOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("callback is required!");
    }

    fun(this.root);

    function fun(root) {
      if (!root) return;

      callback(root.data);
      fun(root.left);
      fun(root.right);
    }
  }

  postOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("callback is required!");
    }

    fun(this.root);

    function fun(root) {
      if (!root) return;

      fun(root.left);
      fun(root.right);
      callback(root.data);
    }
  }

  height(value) {
    let current = this.root;

    while (current) {
      if (value === current.data) break;
      current = (value < current.data) ? current.left : current.right;
    }

    if (!current) return;

    return fun(current);

    function fun(node) {
      if (!node) return -1;
      if (!node.left && !node.right) return 0;

      const leftHeight = fun(node.left);
      const rightHeight = fun(node.right);

      return 1 + Math.max(leftHeight, rightHeight);
    }
  }

  depth(value) {
    let current = this.root;
    let count = 0;

    while (current) {
      if (value === current.data) return count;
      current = (value < current.data) ? current.left : current.right;
      count++;
    }
  }

  isBalanced() {
    return fun(this.root) !== -1;

    function fun(node) {
      if (!node) return 0;

      const leftHeight = fun(node.left);
      const rightHeight = fun(node.right);

      if (leftHeight === -1 || rightHeight === -1) return -1;
      if (Math.abs(leftHeight - rightHeight) > 1) return -1;

      return 1 + Math.max(leftHeight, rightHeight);
    }
  }

  rebalance() {
    const temp = [];
    this.inOrderForEach(value => temp.push(value));
    this.root = this.#buildTree(temp);
  }
}

export default Tree;