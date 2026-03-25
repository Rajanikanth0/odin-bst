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
    let current = this.root;
    let parent = null;

    while (current) {
      if (current.data === value) break;
      
      parent = current;
      current = (value < current.data) ? current.left : current.right;
    }

    if (!current) return;

    let subCurrent = current.right;
    let subParent = current;

    // deletion of a leaf node
    if (!subCurrent) {
      if (value < parent.data) {
        parent.left = current.left;
      } else {
        parent.right = current.left;
      }
      return;
    }

    while(subCurrent.left) {
      subParent = subCurrent;
      subCurrent = subCurrent.left;
    }

    // deletion of a parent node with one child node
    if (subParent.data === current.data) {
      parent.right = subCurrent;
      subCurrent.left = current.left;
      return;
    }
    
    if (parent) {
      parent.right = subCurrent;
    } else {
      this.root = subCurrent;
    }

    subParent.left = subCurrent.right;
    subCurrent.left = current.left;
    subCurrent.right = current.right;
  }
}

export default Tree;