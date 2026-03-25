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
    this.root = this.#buildTree(this.arr);
  }
  
  #buildTree() {
    return fun(this.arr, 0, this.arr.length-1);
    
    function fun(arr, start, end) {
      if (start > end) return null;

      const mid = start + Math.floor((end - start) / 2);
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
}

export default Tree;