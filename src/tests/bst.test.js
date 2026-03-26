import Tree from "../modules/bst";

let tree;
beforeEach(() => {
  const array = [1, 2, 3, 5, 6, 7, 8, 9];
  tree = new Tree(array);
})

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

describe("deleteItem method", () => {
  test.skip("value already exists!", () => {});
  test("deletion of a leaf node (1)", () => {
    tree.deleteItem(1);
    
    expect(tree.includes(1)).toBe(false);
    expect(tree.includes(2)).toBe(true);
  })
  test("deletion of a node with one child (8)", () => {
    tree.deleteItem(8);
    
    expect(tree.includes(8)).toBe(false);
    expect(tree.includes(9)).toBe(true);
  })
  test("deletion of a node with two children (7)", () => {
    tree.deleteItem(7);
    
    expect(tree.includes(7)).toBe(false);
    expect(tree.includes(8)).toBe(true);
  })
  test("deletion of root node (5)", () => {
    tree.deleteItem(5);
    
    expect(tree.includes(5)).toBe(false);

    expect(tree.root.data).not.toBe(5);
    expect(tree.includes(3)).toBe(true);
    expect(tree.includes(6)).toBe(true);
  })
})

describe("levelOrderForEach method", () => {
  test("throws error if callback is missing", () => {
    expect(() => tree.levelOrderForEach()).toThrow("callback is required!");
  })
  test("visits nodes in breadth-first order (level by level)", () => {
    const visited = [];
    const mockFn = jest.fn(data => visited.push(data));

    tree.levelOrderForEach(mockFn);

    expect(mockFn).toHaveBeenCalledTimes(8);
    expect(visited).toEqual([5, 2, 7, 1, 3, 6, 8, 9]);

    expect(mockFn).toHaveBeenNthCalledWith(1, 5);
    expect(mockFn).toHaveBeenNthCalledWith(4, 1);
    expect(mockFn).toHaveBeenNthCalledWith(8, 9);
  })
})

describe("inOrderForEach method", () => {
  test("throws error if callback is missing", () => {
    expect(() => tree.levelOrderForEach()).toThrow("callback is required!");
  })
  test("visits nodes in in-order (left-root-right)", () => {
    const visited = [];
    const mockFn = jest.fn(data => visited.push(data));

    tree.inOrderForEach(mockFn);

    expect(mockFn).toHaveBeenCalledTimes(8);
    expect(visited).toEqual([1, 2, 3, 5, 6, 7, 8, 9]);

    expect(mockFn).toHaveBeenNthCalledWith(1, 1);
    expect(mockFn).toHaveBeenNthCalledWith(4, 5);
    expect(mockFn).toHaveBeenNthCalledWith(8, 9);
  })
})