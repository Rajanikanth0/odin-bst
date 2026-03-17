import Tree from "../modules/bst";

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
}

let tree;
beforeEach(() => {
  const array = [1, 2, 3, 5, 6, 7, 8, 9];
  tree = new Tree(array);
})

// const array = [1, 2, 3, 5, 6, 7, 8, 9];
// let temp = new Tree(array);
// prettyPrint(temp.root);

describe("includes method", () => {
  test("value not found!", () => {
    expect(tree.includes(4)).toBe(false);
  })
  test("first(root) value in the tree", () => {
    expect(tree.includes(5)).toBe(true);
  })
  test("last value in the tree", () => {
    expect(tree.includes(9)).toBe(true);
  })
})

describe("insert method", () => {
  test.skip("value already exists!", () => {});
  test("insert before smallest node value", () => {
    const value = 0;

    expect(tree.includes(value)).toBe(false);
    tree.insert(value);
    expect(tree.includes(value)).toBe(true);
  })
  test("insert a value in the middle", () => {
    const value = 4;

    expect(tree.includes(value)).toBe(false);
    tree.insert(value);
    expect(tree.includes(value)).toBe(true);
  })
  test("insert after largest node value", () => {
    const value = 10;

    expect(tree.includes(value)).toBe(false);
    tree.insert(value);
    expect(tree.includes(value)).toBe(true);
  })
})

describe.only("deleteItem method", () => {
  test.skip("value already exists!", () => {});
  test("deletion of a leaf node", () => {
    const value = 1;

    expect(tree.includes(value)).toBe(true);
    tree.deleteItem(value);
    expect(tree.includes(value)).toBe(false);
  })
  test("deletion of a node with one child node", () => {
    const value = 8;

    expect(tree.includes(value)).toBe(true);
    tree.deleteItem(value);
    expect(tree.includes(value)).toBe(false);
  })
  test("deletion of a node with two child nodes", () => {
    const value = 7;

    expect(tree.includes(value)).toBe(true);
    tree.deleteItem(value);
    expect(tree.includes(value)).toBe(false);
  })
})