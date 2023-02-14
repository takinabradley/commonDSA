function QueueNode(value) {
  const node = Object.create(null)
  node.value = value
  node.next = null
  return node
}

function Queue() {
  let front = null
  let rear = null

  function enqueue(value) {
    const newNode = QueueNode(value)
    if(rear === null) {
      //if queue is empty, set front and rear to the only node
      front = newNode
      rear = newNode
      return
    }
    rear.next = newNode
    rear = newNode
  }

  function dequeue() {
    if(front === null) {
      //if empty, return nothing
      return null
    } else if(front.next === null) {
      // if it's the last item, return the last item and set pointers to null
      const value = front.value
      rear = null
      front = null
      return value
    } else {
      // otherwise, pop the last value off the queue and set front to next node
      const value = front.value
      front = front.next
      return value
    }
  }

  return Object.create(null, {
    enqueue: {enumerable: true, value: enqueue},
    dequeue: {enumerable: true, value: dequeue},
    front: {enumerable: true, get() {return front}},
    rear: {enumerable: true, get() {return rear}}
  })
}

export default Queue