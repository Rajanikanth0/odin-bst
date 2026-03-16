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

  insert(value) {
    const newNode = new Node(value);
    
    if (!this.root) {
      this.root = newNode;
      return;
    }

    let current = this.root;
    let parent = null;

    while(current) {
      parent = current;
      current = (current.data > value) ? current.left : current.right;
    }

    if (value < parent.data) parent.left = newNode;
    else parent.right = newNode;
  }
}

export default Tree;