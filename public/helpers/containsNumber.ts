export function containsNumber(value: string | number): boolean {
  const isTypeNumber = typeof value === 'number'
  if (isTypeNumber) return true
  const isStringContainingNumber = /\d/.test(value)
  if (isStringContainingNumber) return true
  return false
}
