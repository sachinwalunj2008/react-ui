export const abbreviateNumber = (
  num: number,
  suffix?: string
): string | number => {
  if (suffix === '%') {
    return num
  }
  const absNum = Math.abs(num)
  if (absNum >= 1_000_000_000) {
    return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B'
  }
  if (absNum >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M'
  }
  if (absNum >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K'
  }
  if (absNum < 1 && absNum > 0) {
    return num.toFixed(2)
  }
  return Math.floor(num)
}
