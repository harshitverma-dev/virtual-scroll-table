import { useMemo } from "react"

export function useVirtualizedRows({ data, rowHeight, scrollTop, containerHeight, buffer }) {
  const totalRows = data.length

  const { startIndex, endIndex, visibleRows, offset } = useMemo(() => {
    const startIdx = Math.max(0, Math.floor(scrollTop / rowHeight) - buffer)
    const endIdx = Math.min(totalRows - 1, Math.ceil((scrollTop + containerHeight) / rowHeight) + buffer)
    const rows = data.slice(startIdx, endIdx + 1)
    const off = startIdx * rowHeight
    return { startIndex: startIdx, endIndex: endIdx, visibleRows: rows, offset: off }
  }, [data, rowHeight, scrollTop, containerHeight, buffer, totalRows])

  return { startIndex, endIndex, visibleRows, offset }
}
