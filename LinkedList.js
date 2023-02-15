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
    if(callback === 'function') callback(list)
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

  const pop = () => {
    if(size === 0) return null
    if(size === 1) {
      const headValue = head.value
      head = null
      tail = null
      --size
      return headValue
    }

    const secondToLastNode = nodeAt(head, size - 2)
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
    pop
  })
  addGetter(linkedList, 'head', () => head)
  addGetter(linkedList, 'tail', () => tail)
  addGetter(linkedList, 'size', () => size)

  return linkedList
}