export type Rect = {
  x: number
  y: number
  width: number
  height: number
  id: string
}

export type Line = {
  x1: number
  x2: number
  y1: number
  y2: number
}

export const rectsIntersect = (
  rect: Rect,
  occupiedArr: Array<Rect>
): boolean => {
  const buffer = 10
  let isOccupied = false
  if (occupiedArr.length > 0) {
    occupiedArr.forEach((r) => {
      if (
        r.x < rect.x + rect.width + buffer &&
        r.x + r.width + buffer > rect.x &&
        r.y < rect.y + rect.height + buffer &&
        r.y + r.height + buffer > rect.y
      ) {
        isOccupied = true
      }
    })
  }

  return isOccupied
}

// function from StackOverflow (https://stackoverflow.com/questions/9043805/test-if-two-lines-intersect-javascript-function)
// returns true if the line from (a,b)->(c,d) intersects with (p,q)->(r,s)
const doLinesIntersect = (
  a: number,
  b: number,
  c: number,
  d: number,
  p: number,
  q: number,
  r: number,
  s: number
): boolean => {
  const det = (c - a) * (s - q) - (r - p) * (d - b)
  if (det === 0) {
    return false
  } else {
    const lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det
    const gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det
    return 0 < lambda && lambda < 1 && 0 < gamma && gamma < 1
  }
}

export const crossesLines = (rect: Rect, lines: Line[]): boolean => {
  const rectLines = {
    line1: { x1: rect.x, x2: rect.x + rect.width, y1: rect.y, y2: rect.y },
    line2: { x1: rect.x, x2: rect.x, y1: rect.y, y2: rect.y + rect.height },
    line3: {
      x1: rect.x + rect.width,
      x2: rect.x + rect.width,
      y1: rect.y,
      y2: rect.y + rect.height,
    },
    line4: {
      x1: rect.x,
      x2: rect.x + rect.width,
      y1: rect.y + rect.height,
      y2: rect.y + rect.height,
    },
  }

  let lineIntersects = false
  for (let l = 0; l < lines.length; l++) {
    const line = lines[l]

    for (let r = 1; r <= 4; r++) {
      const rectEdge = `line${r}` as 'line1' | 'line2' | 'line3' | 'line4'
      const rLine = rectLines[rectEdge]
      const intersection = doLinesIntersect(
        line.x1,
        line.y1,
        line.x2,
        line.y2,
        rLine.x1,
        rLine.y1,
        rLine.x2,
        rLine.y2
      )
      if (intersection) {
        lineIntersects = true
        break
      }
    }
    if (lineIntersects) break
  }
  return lineIntersects
}

export const noIntersectingLabelLinesWithRects = (
  line: Line,
  lines: Line[],
  rects: Rect[]
): boolean => {
  let hasIntersections = false
  for (let r = 0; r < rects.length; r++) {
    if (crossesLines(rects[r], [line])) {
      hasIntersections = true
      break
    }
  }
  if (!hasIntersections) {
    for (let l = 0; l < lines.length; l++) {
      if (
        doLinesIntersect(
          line.x1,
          line.y1,
          line.x2,
          line.y2,
          lines[l].x1,
          lines[l].y1,
          lines[l].x2,
          lines[l].y2
        )
      ) {
        hasIntersections = true
        break
      }
    }
  }
  return hasIntersections
}

// Quadrant Order
// 1 | 2
// 4 | 3
export const quadrant1PositionPriority = [
  'top-left',
  'top',
  'left',
  'top-right',
  'bottom-left',
  'bottom',
  'right',
  'bottom-right',
]

export const quadrant2PositionPriority = [
  'top-right',
  'top',
  'right',
  'top-left',
  'bottom-right',
  'left',
  'bottom',
  'bottom-left',
]

export const quadrant3PositionPriority = [
  'bottom-right',
  'bottom',
  'right',
  'bottom-left',
  'top-right',
  'top',
  'left',
  'top-left',
]

export const quadrant4PositionPriority = [
  'bottom-left',
  'bottom',
  'left',
  'bottom-right',
  'top-left',
  'top',
  'right',
  'top-right',
]

export const getQuadrant = (
  xValue: number,
  yValue: number,
  refX: number,
  refY: number
): 1 | 2 | 3 | 4 => {
  if (xValue < refX && yValue < refY) {
    return 4
  } else if (xValue >= refX && yValue >= refY) {
    return 2
  } else if (xValue > refX && yValue <= refY) {
    return 3
  } else {
    return 1
  }
}

export const displayLabelName = (
  name = ''
): { name1: string; name2: string } => {
  const nameWordArray = name.slice(0, 60).split(' ')
  let namePart1 = '',
    namePart2 = ''

  for (let i = 0; i < nameWordArray.length; i++) {
    if (namePart1.length + nameWordArray[i].length < 30) {
      namePart1 += `${nameWordArray[i]} `
    } else if (namePart2.length + nameWordArray[i].length < 30) {
      namePart2 += `${nameWordArray[i]} `
    } else {
      namePart2 += `${nameWordArray[i]}`
      namePart2 = namePart2.slice(0, 28) + '...'
      break
    }
  }

  return { name1: namePart1.trim(), name2: namePart2.trim() }
}
