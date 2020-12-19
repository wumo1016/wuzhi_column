interface CheckCondition {
  format?: string[]
  size?: number
}
type ErrorType = 'size' | 'format' | null
export function brforeUploadCheck(file: File, condition: CheckCondition) {
  const { format, size } = condition
  const isValidFormat = format ? format.includes(file.type) : true
  const isValidSize = size ? file.size / 1024 / 1024 < size : true
  let type: ErrorType = null
  if (!isValidFormat) {
    type = 'format'
  } else if (!isValidSize) {
    type = 'size'
  }
  return {
    passed: isValidFormat && isValidFormat,
    type
  }
}
