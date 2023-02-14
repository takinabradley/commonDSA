import Queue from './Queue.js'

function BinaryNode(value) {
  const node = Object.create(null)
  node.value = value,
  node.left = null
  node.right = null
  return node
}

function traverseDepth(tree) {
  /*preorder*/
  /* also inorder (left -> root -> right) and postorder (left -> right -> root) */
  /* is it as easy as just changing where the log is in the search? */
  if(tree === null) return
  console.log(tree.value)
  traverseDepth(tree.right)
  traverseDepth(tree.left)
}

function traverseBreadth(tree, queue = Queue()) {
  if(queue.front === null) queue.enqueue(tree)
  while(queue.front !== null) {
    const dequeued = queue.dequeue() 
    if(dequeued === null) {console.log('is null');break}
    console.log(dequeued.value)
    if(dequeued.left) queue.enqueue(dequeued.left)
    if(dequeued.right) queue.enqueue(dequeued.right)
  }
}

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
const myTree = makeTree([5, 1, 2, 3, 6, 7, 8])
console.log('mytree', myTree)

console.log('regualar traversal')
traverseDepth(myTree) 
console.log('breadth traversal')
traverseBreadth(myTree)