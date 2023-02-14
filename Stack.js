function StackNode(value) {
  const node = Object.create(null)
  node.next = null
  node.value = value
  return node
}

function Stack() {
  let top = null

  function push(value) {
    const newNode = StackNode(value)
    if(top === null) {
      top = newNode
    } else {
      const temp = top
      top = newNode
      newNode.next = temp
    }
  }

  function pop() {
    if(top === null) {
      return null
    } else if(top.next === null) {
      const node = top
      top = null
      return node.value
    } else {
      const node = top
      top = top.next
      return node.value
    }
  }

  return Object.create(null, {
    top: {enumerable: true, get() {return top}},
    push: {enumerable: true, value: push},
    pop: {enumerable: true, value: pop}
  })
}