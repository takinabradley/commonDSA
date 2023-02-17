import addGetter from './addGetter.js'

function Node(value) {
  const node = Object.create(null)
  node.value = value
  node.next = null
  return node
}

function LinkedList() {
  let head = null
  let tail = null
  let size = 0

  const append = (value) => {
    if(!tail) {
      const headNode = Node(value)
      head = headNode
      tail = headNode
    } else {
      const newNode = Node(value)
      tail.next = newNode
      tail = newNode
    }
    size++
    return size
  }

  const prepend = (value) => {
    if(!head) {
      const headNode = Node(value)
      head = headNode
      tail = headNode
    } else {
      const newNode = Node(value)
      newNode.next = head
      head = newNode
    }
    size++
    return size
  }

  const listContains = (list, value) => {
    if(list === null) return false
    if(list.value === value) return true
    return listContains(list.next, value)
  }

  const findInList = (list, value, count = 0) => {
    if(list === null) return null
    if(list.value === value) return count
    return findInList(list.next, value, ++count)
  }

  /* const findsize = (list, count = 0) => {
    if(list === null) return count
    return findsize(list.next, ++count)
  } */

  const valueAtIndex = (list, index, count = 0) => {
    if(list === null) return
    if(count === index) return list.value
    return valueAtIndex(list.next, index, ++count)
  }

  const at = (index) => {
    return valueAtIndex(head, index)
  }

  const contains = (value) => {
    return listContains(head, value)
  }

  const find = (value) => {
    return findInList(head, value)
  }

  const traverseList = (list, callback) => {
    if(list === null) return
    if(typeof callback === 'function') callback(list)
    return traverseList(list.next, callback)
  }

  const toString = () => {
    if(head === null) return 'null'
    let string = ''
    traverseList(head, (node) => string += `(${node.value}) -> `)
    string += 'null'
    return string
  }

  const nodeAt = (list, index, count = 0) => {
    if(list === null) return
    if(count === index) return list
    return nodeAt(list.next, index, ++count)
  }

  const removeAt = (index) => {
    if(index < 0 || index >= size) return false
    if(size === 0) return false
    if((index + 1) === size) {
      console.log('popping...')
      pop()
      return true
    }
    if(index === 0) {
      --size
      head = head.next
      return true
    }

    --size
    const nodeBefore = nodeAt(head, index - 1)
    const removedNode = nodeAt(head, index)
    nodeBefore.next = removedNode.next
    return true
  }

  const insertAt = (index, value) => {
    if(index === undefined || index > size || index < 0) return false
    if(size === 0) {
      append(value)
      return true
    }
    if(index === 0) {
      prepend(value)
      return true
    }
    if(index === size) {
      const newTail = Node(value)
      const oldTail = tail
      oldTail.next = newTail
      newTail.next = null
      tail = newTail
      size++
      return true
    }
    
    const newNode = Node(value)
    const nodeBefore = nodeAt(head, index - 1)
    const nodeAtIndex = nodeAt(head, index)
    nodeBefore.next = newNode
    newNode.next = nodeAtIndex
    size++
    return true
  }

  const pop = () => {
    if(size === 0) return null
    if(size === 1) {
      const headValue = head.value
      head = null
      tail = null
      --size
      return headValue
    }

    
    const secondToLastNode = nodeAt(head, size - 1)
    
    const oldTail = tail
    secondToLastNode.next = null
    tail = secondToLastNode
    --size
    return oldTail.value
  }

  const linkedList = Object.assign(Object.create(null), {
    append,
    prepend,
    at,
    contains,
    find,
    toString,
    pop,
    removeAt, 
    insertAt
  })
  addGetter(linkedList, 'head', () => head)
  addGetter(linkedList, 'tail', () => tail)
  addGetter(linkedList, 'size', () => size)

  return linkedList
}
