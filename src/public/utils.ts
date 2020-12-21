interface CheckCondition {
  format?: string[]
  size?: number
}
type ErrorType = 'size' | 'format' | null
export function brforeUploadCheck(file: File, condition: CheckCondition) {
  const { format, size } = condition
  const isValidFormat = format ? format.includes(file.type) : false
  const isValidSize = size ? file.size / 1024 / 1024 < size : false
  let type: ErrorType = null
  if (!isValidFormat) {
    type = 'format'
  } else if (!isValidSize) {
    type = 'size'
  }
  return {
    passed: isValidFormat && isValidSize,
    type
  }
}
