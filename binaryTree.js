function BinaryNode(value) {
  return {
    value,
    left: null,
    right: null
  }
}

function traverseTree(tree) {
  if(tree === null) return
  console.log(tree.value)
  traverseTree(tree.right)
  traverseTree(tree.left)
}

/* lol I guess it's not that easy.
function traverseTreeBreadth(tree, left = tree.left, right = tree.right) {
  if(tree.isHead) console.log(tree.value)
  // add check to see if tree value is the value if we're searching
  if(tree === null) return
  if(left === null && right === null) return
  console.log(left.value)
  console.log(right.value)
  traverseTree(left)
  traverseTree(right)
} */

function placeInTree(tree, node) {
  if(tree.left === null && node.value < tree.value) {
    tree.left = node
    return
  }
  if(tree.right === null && node.value >= tree.value) {
    tree.right = node
    return
  }
  if(node.value >= tree.value) {
    placeInTree(tree.right, node)
  }
  if(node.value < tree.value) {
    placeInTree(tree.left, node)
  }
}

function makeTree(arr) {
  // reverse it so we can pop instead of shift.
  arr.reverse()
  const head = BinaryNode(arr.pop())
  head.isHead = true

  while(arr.length) {
    const node = BinaryNode(arr.pop())
    placeInTree(head, node)
  }

  return head
}
const myTree = makeTree([8, 1, 4, 3, 5, 4, 2, 0, 8, 7, 6, 1, 2])
console.log('mytree', myTree)

console.log('regualar traversal')
traverseTree(myTree)
console.log('breadth traversal')
traverseTreeBreadth(myTree)
