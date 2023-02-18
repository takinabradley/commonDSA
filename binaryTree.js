import { Queue } from "./Queue.js"
import Stack from "./Stack.js"

function BinaryNode(value) {
  const node = Object.create(null)
  node.value = value
  node.left = null
  node.right = null
  return node
}

function traverseDepth(tree) {
  /*preorder*/
  /* also inorder (left -> root -> right) and postorder (left -> right -> root) */
  /* is it as easy as just changing where the log is in the search? */
  if (tree === null) return
  console.log(tree.value)
  traverseDepth(tree.right)
  traverseDepth(tree.left)
}

function traverseDepthWithStack(tree) {
  if (tree === null) return
  const stack = Stack()
  stack.push(tree)
  const list = []
  while (stack.size > 0) {
    const lastNode = stack.pop()
    list.push(lastNode.value)
    if (lastNode.left) stack.push(lastNode.left)
    if (lastNode.right) stack.push(lastNode.right)
  }

  return list
}

function traverseBreadth(tree, queue = Queue()) {
  if (queue.front === null) queue.enqueue(tree)
  while (queue.front !== null) {
    const dequeued = queue.dequeue()
    if (dequeued === null) {
      console.log("is null")
      break
    }
    console.log(dequeued.value)
    if (dequeued.left) queue.enqueue(dequeued.left)
    if (dequeued.right) queue.enqueue(dequeued.right)
  }
}

function traverseBreadthRecursive(tree, queue) {
  if(!queue && tree) {
    queue = Queue()
    queue.enqueue(tree)
  }
  if(queue.front === null) return
  const dequeued = queue.dequeue()
  console.log(dequeued.value)
  if(dequeued.left) queue.enqueue(dequeued.left)
  if(dequeued.right) queue.enqueue(dequeued.right)
  traverseBreadthRecursive(null, queue)
}

function placeInTree(tree, node) {
  if (tree.left === null && node.value < tree.value) {
    tree.left = node
    return
  }
  if (tree.right === null && node.value >= tree.value) {
    tree.right = node
    return
  }
  if (node.value >= tree.value) {
    placeInTree(tree.right, node)
  }
  if (node.value < tree.value) {
    placeInTree(tree.left, node)
  }
}

function placeInTreeWithStack(tree, node) {
  if (tree === null) return
  const stack = Stack()
  stack.push(tree)
  while (stack.size > 0) {
    const currentNode = stack.pop()

    if (currentNode.left === null && node.value < currentNode.value) {
      currentNode.left = node
      break
    }
    if (currentNode.right === null && node.value >= currentNode.value) {
      currentNode.right = node
      break
    }
    if (node.value >= currentNode.value) {
      stack.push(currentNode.right)
    }
    if (node.value < currentNode.value) {
      stack.push(currentNode.left)
    }
  }
}

function makeTree(arr) {
  // reverse it so we can pop instead of shift.
  arr.reverse()
  const head = BinaryNode(arr.pop())
  head.isHead = true

  while (arr.length) {
    const node = BinaryNode(arr.pop())
    placeInTree(head, node)
  }

  return head
}

function makeBalancedTree(array, start = 0, end = array.length - 1) {
  if (start > end) return null
  /* traverse the array in a binary fashion */
  /*As we do this, turn each element into a node, and add their children
    recursively */
  const midPoint = Math.floor((start + end) / 2)
  const node = BinaryNode(array[midPoint])
  node.left = makeBalancedTree(array, start, midPoint - 1)
  node.right = makeBalancedTree(array, midPoint + 1, end)
  return node
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false)
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`)
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true)
  }
}

const myTree = makeTree([5, 1, 2, 3, 6, 7, 8])
console.log("mytree", myTree)

console.log("regualar traversal")
traverseDepth(myTree)
console.log("breadth traversal")
traverseBreadth(myTree)
console.log(traverseDepthWithStack(myTree))
prettyPrint(myTree)
placeInTreeWithStack(myTree, BinaryNode(0))
prettyPrint(myTree)
