import {Queue} from './Queue.mjs'

function BinaryNode(value) {
  const node = Object.create(null);
  node.value = value
  node.left = null
  node.right = null;
  return node;
}

function Tree(array) {
  if(!Array.isArray(array)) throw TypeError(`Cannot build tree from value ${array}, which has a type of ${typeof array}`)
  let root = _buildTree(array)
  function _buildTree(array, start = 0, end = array.length - 1) {
    if (start > end) return null;
    /* traverse the array in a binary fashion */
    /*As we do this, turn each element into a node, and add their children
      recursively */
    const midPoint = Math.floor((start + end) / 2);
    const node = BinaryNode(array[midPoint]);
    node.left = _buildTree(array, start, midPoint - 1);
    node.right = _buildTree(array, midPoint + 1, end);
    return node;
  }

  function _insertValueInTree(tree, value) {
    /* better version of my placeInTree func */
    if(tree === null) {
      const newNode = new BinaryNode(value) 
      return newNode
    }

    if(value < tree.value) {
      tree.left = _insertValueInTree(tree.left, value)
    } else if (value >= tree.value) {
      tree.right = _insertValueInTree(tree.right, value)
    }

    return tree
  }

  function _findValueOfInorderSuccessor(rightSubTree) {
    const minValue = rightSubTree.value
    const leftSubtree = rightSubTree
    while (leftSubtree.left !== null) {
      minValue = leftSubtree.left.value
      leftSubtree = leftSubtree.left
    }
    return minValue
  }

  function _depthFirstTraversal(tree, callback, traversalType = 'preorder') {
    if(tree === null) return tree
    if(typeof callback === 'function' && traversalType === 'preorder') callback(tree)
    _depthFirstTraversal(tree.left, callback, traversalType)
    if(typeof callback === 'function' && traversalType === 'inorder') callback(tree)
    _depthFirstTraversal(tree.right, callback, traversalType)
    if(typeof callback === 'function' && traversalType === 'postorder') callback(tree)
  }

  function _breadthFirstTraversal(tree, callback) {
    const queue = Queue()
    if (queue.front === null) queue.enqueue(tree)
    while (queue.front !== null) {
      const dequeued = queue.dequeue()
      if(typeof callback === 'function') callback(dequeued)
      if (dequeued.left) queue.enqueue(dequeued.left)
      if (dequeued.right) queue.enqueue(dequeued.right)
    }
  }

  function _deleteValueFromTree(tree, value) {
    //return null 
    if(tree === null) return tree

    if(value < tree.value) {
      //search the left of the tree to delete and return this node when done
      tree.left = _deleteValueFromTree(tree.left, value)
    } else if (value > tree.value) {
      //search the right of the tree to delete and return this node when done
      tree.right = deleteRec(tree.right, value)
    } else {
      // if the the value of the this node is equal to value
      //check if we can just replace it with the left or right nodes
      if(tree.left === null) {
        return tree.right
      } else if(tree.right === null) {
        return tree.left
      }

      //if not, find the lowest value on the right side of the tree
      // (AKA: next largest value), set this nodes value to that, and 
      // re-run starting with right side of the tree to delete the 
      // node we stole the value from.
      tree.value = _findValueOfInorderSuccessor(tree.right)
      tree.right = _deleteValueFromTree(tree.right, tree.value)
    }
    return tree
  }

  function _returnTraversalAsArray(userCallback, traversalType) {
    // create array and default callback
    const array = []
    let callback = (node) => array.push(node.value)

    // if user supplies callback, push callback values to array
    if(typeof userCallback === 'function') {
      callback = (node) => array.push(userCallback(node)) 
    }

    if(traversalType !== 'levelorder') {
      _depthFirstTraversal(root, callback, traversalType)
    } else {
      _breadthFirstTraversal(root, callback)
    }

    // return the array of callback return values
    return array
  }

  function _prettyPrint(node, prefix = '', isLeft = true) {
    if (node.right !== null) {
      _prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
    if (node.left !== null) {
      _prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }

  function _findNodeInTree(tree, value) {
    if(tree === null) return
    if(tree.value === value) return tree

    const foundNodeInLeftSide = _findNodeInTree(tree.left, value)
    if(foundNodeInLeftSide) return foundNodeInLeftSide

    const foundNodeInRightSide = _findNodeInTree(tree.right, value)
    if(foundNodeInRightSide) return foundNodeInRightSide
  }

  function _findDepthOfNodeInTree(tree, node, count = 0) {
    if(tree === null) return
    if(tree === node) return count

    const depthFoundInLeft = _findDepthOfNodeInTree(tree.left, node, count + 1)
    if(typeof depthFoundInLeft === 'number') return depthFoundInLeft

    const depthFoundInRight = _findDepthOfNodeInTree(tree.right, node, count + 1)
    if(typeof depthFoundInRight === 'number') return depthFoundInRight

    return
  }

  function insertValue(value) {
    root = _insertValueInTree(root, value)
  }

  function deleteValue(value) {
    root = _deleteValueFromTree(root, value)
  }

  function inorder(userCallback) {
    return _returnTraversalAsArray(userCallback, 'inorder')
  }

  function preorder(userCallback) {
    return _returnTraversalAsArray(userCallback, 'preorder')
  }

  function postorder(userCallback) {
    return _returnTraversalAsArray(userCallback, 'postorder')
  }

  function levelOrder(userCallback) {
    return _returnTraversalAsArray(userCallback, 'levelorder')
  }

  function find(value) {
    return _findNodeInTree(root, value)
  }

  function depth(node) {
   return  _findDepthOfNodeInTree(root, node)
  }

  function height(node, count = 0) {
    if(node === null) return count - 1
    const heightLeft = height(node.left, count + 1)
    const heightRight = height(node.right, count + 1)
    return (heightLeft >= heightRight) ? heightLeft : heightRight
  }

  function isBalanced() {
    if(root === null || (!root.left && !root.right)) return true
    
    const depthOfLeft = height(root.left)
    const depthOfRight = height(root.right)
    if(depthOfLeft === depthOfRight) return true
    if(depthOfLeft == depthOfRight + 1 || depthOfRight === depthOfLeft + 1) return true
    return false
  }

  function rebalance() {
    const treeArray = preorder()
    root = _buildTree(treeArray)
  }

  function prettyPrint() {
    return _prettyPrint(root)
  }


  return {
    insertValue,
    deleteValue,
    inorder,
    preorder,
    postorder,
    levelOrder,
    find,
    depth,
    height,
    isBalanced,
    rebalance,
    prettyPrint,
    get root() {return root}
  }

}

function randomArray() {
  const array = new Array(Math.floor(Math.random() * 26))
  for(let i = 0; i < array.length; i++) {
    array[i] = Math.floor(Math.random() * 101)
  }
  return array
}

const myTree = Tree(randomArray())


const root = myTree.find(myTree.root.value)
console.log("Building balanced tree......")
myTree.prettyPrint()
console.log('verifying balance...', myTree.isBalanced())
console.log('\ndebalancing array....')
while(myTree.isBalanced()) {
  const randomValue = Math.floor(Math.random() * 101)
  console.log('inserting random value...', randomValue)
  myTree.insertValue(randomValue)
}
console.log('verifying debalance is done....', !myTree.isBalanced())
myTree.prettyPrint()
console.log('\n rebalancing....')
myTree.rebalance()
myTree.prettyPrint()
console.log('rebalancing worked?', myTree.isBalanced())
console.log(myTree.preorder())
console.log(myTree.postorder(), myTree.inorder())
