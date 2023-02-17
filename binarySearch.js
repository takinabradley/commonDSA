function binarySearch(array, value, start = 0, end = array.length - 1) {
  if(end < start) return false
  const midPoint = Math.floor((start + end) / 2)

  // if this is the first run of the function, also check start and end indexes
  // as a quick optimisation 
  if(start === 0 && end === array.length - 1) {
    if(array[start] === value) return start
    if(array[end] === value) return end
  }

  // if the midpoint has the value, return that index
  if(array[midPoint] === value) return midPoint

  // search the left side of current search area if midpoint didn't have value
  if(value < array[midPoint]) return bsearch(array, value, start, midPoint - 1)
  // search the right side of current search area if midpoint didn't have value
  if(value > array[midPoint]) return bsearch(array, value, midPoint + 1, end)
  throw new Error("Something went wrong, could not compare if value is less than or greater array elements")
}

function traveseArrayBinarily(array, start = 0, end = array.length - 1) {
  /* traverse the whole array without searching */
  if(end < start) return
  const mid = Math.floor((start + end) / 2)
  console.log(array[mid])
  traveseArrayBinarily(array, start, mid - 1)
  traveseArrayBinarily(array, mid + 1, end)
}

function binarySearchIterative(array, value) {
  let start = 0;
  let end = array.length - 1
  while(start <= end) {
    const mid = Math.floor((start + end) / 2)
    if(array[mid] === value) return mid
    if(value < array[mid]) end = mid - 1
    if(value > array[mid]) start = mid + 1
  }
  return false
}
