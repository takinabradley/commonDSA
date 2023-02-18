import addGetter from "./addGetter.mjs"

function StackNode(value) {
  const node = Object.create(null)
  node.next = null
  node.value = value
  return node
}

function Stack() {
  let top = null
  let size = 0

  const push = (value) => {
    const newNode = StackNode(value)
    size++
    if(top === null) {
      top = newNode
    } else {
      const temp = top
      top = newNode
      newNode.next = temp
    }
  }

  const pop = () => {
    if(top === null) {
      return null
    } else if(top.next === null) {
      size--
      const node = top
      top = null
      return node.value
    } else {
      size--
      const node = top
      top = top.next
      return node.value
    }
  }

  const stack = Object.assign(Object.create(null), {
    push,
    pop
  })
  addGetter(stack, 'size', () => size)
  return stack
}

function LimitedStack(size) {
  if(!size) throw TypeError('LimitedStack must have a maximum size!')
  let top = null
  let currentSize = 0

  const isFull = () => currentSize === size
  const push = (value) => {
    if(isFull()) throw Error('Stack is full!')
    const newNode = StackNode(value)
    if(top === null) {
      top = newNode
    } else {
      const temp = top
      top = newNode
      newNode.next = temp
    }
    return ++currentSize
  }

  const pop = () => {
    if(top === null) {
      return null
    } else if(top.next === null) {
      --currentSize
      const node = top
      top = null
      return node.value
    } else {
      --currentSize
      const node = top
      top = top.next
      return node.value
    }
  }

  return Object.create(null, {
    top: {enumerable: true, get() {return top}},
    push: {enumerable: true, value: push},
    pop: {enumerable: true, value: pop},
    isFull: {enumerable: true, value: isFull},
    size: {enumerable: true, value: size},
    currentSize: {enumerable: true, get() {return currentSize}}
  })
}

export default Stack
export {LimitedStack}