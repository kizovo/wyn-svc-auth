export function isStrIsNumeric(str: any): boolean {
  // only accept strings
  if (typeof str != 'string') return false

  return !isNaN(parseFloat(str))
}
