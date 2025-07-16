import { useMemo } from "react"

const VISIBLE_COLUMNS_BUFFER = 5
export function useVirtualizedColumns({ columns, scrollLeft, containerWidth, buffer = VISIBLE_COLUMNS_BUFFER }) {
  const totalColumns = columns.length

  const { visibleColumns, startColIndex, offset } = useMemo(() => {
    let currentWidth = 0
    let startIdx = 0
    let endIdx = totalColumns - 1

    for (let i = 0; i < totalColumns; i++) {
      currentWidth += columns[i].width
      if (currentWidth > scrollLeft) {
        startIdx = i
        break
      }
    }

    startIdx = Math.max(0, startIdx - buffer)

    currentWidth = 0
    let renderedWidth = 0
    for (let i = startIdx; i < totalColumns; i++) {
      currentWidth += columns[i].width
      renderedWidth += columns[i].width
      if (renderedWidth > containerWidth + buffer * (columns[0]?.width || 150)) {
        endIdx = i
        break
      }
      endIdx = i 
    }
    endIdx = Math.min(totalColumns - 1, endIdx + buffer)

    let off = 0
    for (let i = 0; i < startIdx; i++) {
      off += columns[i].width
    }

    const visibleCols = columns.slice(startIdx, endIdx + 1)

    return { visibleColumns: visibleCols, startColIndex: startIdx, offset: off }
  }, [columns, scrollLeft, containerWidth, buffer, totalColumns])

  return { visibleColumns, startColIndex, offset }
}
