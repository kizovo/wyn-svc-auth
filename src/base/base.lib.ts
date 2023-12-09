export function isNumeric(str: any) {
  if (typeof str != 'string') return false // we only process strings!
  return !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}
