export default function ListNode(value) {
  return Object.assign(Object.create(null), {
    value,
    next: null
  })
}