export default function addGetter(obj, name, callback, options = {configurable: false, enumerable: true}) {
  const optionKeys = Object.keys(options)
  if(!optionKeys.includes('configurable') || !optionKeys.includes('enumerable')) return
  Object.defineProperty(obj, name, {
    enumerable: options.enumerable,
    configurable: options.configurable,
    get: callback
  })
}