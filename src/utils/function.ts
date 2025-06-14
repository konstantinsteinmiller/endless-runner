// export const lerp = (x, y, a) => x * (1 - a) + y * a
// const invlerp = (x, y, a) => clamp((a - x) / (y - x));
// export const range = (x1, y1, x2, y2, a) => lerp(x2, y2, invlerp(x1, y1, a))
export const range = (angle1: number, angle2: number) => {
  let angle = ((angle1 - angle2 + Math.PI) % (Math.PI * 2)) - Math.PI
  angle = angle < -Math.PI ? angle + Math.PI * 2 : angle
  return angle
}

export const randomInt = (range = 1) => {
  return Math.floor(Math.random() * range + 0.5)
}

export const clamp = (x: number, a: number, b: number) => {
  return Math.min(Math.max(x, a), b)
}

/**
 * Converts a size in bytes to a human-readable string in megabytes (MB).
 *
 * @param bytes - The size in bytes to convert.
 * @param decimals - The number of decimal places to include in the result. Defaults to 2.
 * @returns A string representing the size in megabytes.
 */
export function formatBytesToMB(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 MB'
  const megabytes = bytes / (1024 * 1024)
  return `${megabytes.toFixed(decimals)} MB`
}
export function formatBytesToGB(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 GB'
  const megabytes = bytes / (1024 * 1024 * 1024)
  return `${megabytes.toFixed(decimals)} GB`
}
export function convertToReadableSize(bytes: number, decimals: number = 2): string {
  return bytes > 1048576 * 100 ? formatBytesToGB(bytes, decimals) : formatBytesToMB(bytes, decimals)
}

export const isProduction = import.meta.env.VITE_NODE_ENV === 'production'
let baseURL = import.meta.env.BASE_URL
baseURL = baseURL.slice(0, baseURL.length - 1)
// console.log('baseURL: ', baseURL, isProduction)
export const prependBaseUrl = (url: string): string => (isProduction ? `${baseURL}${url}` : url)
export const repeat = (n: number, callback: (_: any, i: number) => string): string[] => [...new Array(n)].map(callback)

export const mergeObjectsRecursive = (obj1: any, obj2: any) => {
  ;[...Object.keys(obj2)].forEach(key => {
    try {
      if (obj2[key].constructor == Object) {
        obj1[key] = mergeObjectsRecursive(obj1[key], obj2[key])
      } else {
        obj1[key] = obj2[key]
      }
    } catch (e) {
      // Property in destination object not set; create it and set its value.
      obj1[key] = obj2[key]
    }
  })

  return obj1
}

export function removeDoubleSlashComments(inputString) {
  // Regular expression to find and remove double-slash comments
  // It looks for:
  // - Optional whitespace at the beginning of the line (^)
  // - Optional whitespace before the '//'
  // - The '//' characters
  // - Optional whitespace after the '//'
  // - Optional '>' character with optional surrounding whitespace
  // - Any characters until the end of the line ($)
  const regex = /^\s*\/\/\s*>?\s*.*$/gm

  // Replace all matches with an empty string
  return inputString.replace(regex, '')
}

/**
 * Returns a number whose value is limited to the given range.
 *
 * Example: limit the output of this computation to between 0 and 255
 * (x * 255).clamp(0, 255)
 *
 * @param {Number} min The lower boundary of the output range
 * @param {Number} max The upper boundary of the output range
 * @returns A number in the range [min, max]
 * @type Number
 */
Number.prototype.clamp = function (min, max) {
  return Math.min(Math.max(this, min), max)
}
