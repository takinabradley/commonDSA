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

function LimitedQueue(length) {
  if(!length) throw TypeError("LimitedQueue must have a limit!")
  // We lose an index due to our end pointer, so we ++ it.
  length = length + 1
  const queue = new Array(length).fill(null)
  let front = 0
  let end = 0

  const isFull = () => (front - 1 === end) || (front === 0 && end === length - 1)
  const isEmpty = () => end === front
  const enqueue = (value) => {
    if(isFull()) throw Error("Full!")
    queue[end] = value
    end++
    if(end === length) end = 0
  }

  const dequeue = () => {
    if(isEmpty()) return null
    const value = queue[front]
    front++
    if(front === length) front = 0
    return value
  }

  return {
    get front() {return front},
    get end() {return end},
    enqueue,
    dequeue
  }
}

function LimitedQueue2(size) {
  if(!size) throw TypeError("LimitedQueue must have a length!")
  let currentLength = 0;
  let front = null
  let rear = null

  const isFull = () => currentLength === size
  function enqueue(value) {
    const newNode = QueueNode(value)
    if(rear === null) {
      currentLength++
      //if queue is empty, set front and rear to the only node
      front = newNode
      rear = newNode
      return
    }

    if(isFull()) throw Error("LimitedQueue is full!")
    currentLength++
    rear.next = newNode
    rear = newNode
  }

  function dequeue() {
    if(front === null) {
      //if empty, return nothing
      return null
    } else if(front.next === null) {
      currentLength--
      // if it's the last item, return the last item and set pointers to null
      const value = front.value
      rear = null
      front = null
      return value
    } else {
      currentLength--
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
    rear: {enumerable: true, get() {return rear}},
    currentLength: {enumerable: true, get() {return currentLength}},
    size: {enumerable: true, get() {return size}}
  })
}

export {Queue, LimitedQueue}