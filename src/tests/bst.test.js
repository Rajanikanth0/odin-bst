import Tree from "../modules/bst";

let tree;
beforeEach(() => {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  tree = new Tree(array);
})

describe("includes method", () => {
  test("value not found!", () => {
    expect(tree.includes(10)).toBe(false);
  })
  test("first(root) value in the tree", () => {
    expect(tree.includes(5)).toBe(true);
  })
  test("last value in the tree", () => {
    expect(tree.includes(9)).toBe(true);
  })
})