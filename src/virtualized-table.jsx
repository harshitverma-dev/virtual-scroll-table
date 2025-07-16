import { useState, useRef, useEffect, useCallback } from "react"


const DEFAULT_ROW_HEIGHT = 40
const DEFAULT_HEADER_HEIGHT = 48
const DEFAULT_FROZEN_LEFT_COUNT = 2
const DEFAULT_FROZEN_RIGHT_COUNT = 2
const VISIBLE_ROWS_BUFFER = 5

export function VirtualizedTable({
  data,
  columns,
  rowHeight = DEFAULT_ROW_HEIGHT,
  headerHeight = DEFAULT_HEADER_HEIGHT,
  frozenLeftCount = DEFAULT_FROZEN_LEFT_COUNT,
  frozenRightCount = DEFAULT_FROZEN_RIGHT_COUNT,
  tableHeight = 600, 
}) {
  const tableContainerRef = useRef(null)
  const [scrollTop, setScrollTop] = useState(0)
  const [containerWidth, setContainerWidth] = useState(0)

  const totalRows = data.length
  const totalContentHeight = totalRows * rowHeight
  const totalContentWidth = columns.reduce((sum, col) => sum + col.width, 0)


  const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - VISIBLE_ROWS_BUFFER)
  const endIndex = Math.min(totalRows - 1, Math.ceil((scrollTop + tableHeight) / rowHeight) + VISIBLE_ROWS_BUFFER)
  const visibleRows = data.slice(startIndex, endIndex + 1)
  const offset = startIndex * rowHeight

  useEffect(() => {
    const handleResize = () => {
      if (tableContainerRef.current) {
        setContainerWidth(tableContainerRef.current.clientWidth)
      }
    }

    handleResize() 
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleScroll = useCallback(() => {
    if (tableContainerRef.current) {
      setScrollTop(tableContainerRef.current.scrollTop)
    }
  }, [])

  return (
    <div
      ref={tableContainerRef}
      onScroll={handleScroll}
      className="relative overflow-auto border rounded-lg shadow-sm"
      style={{ height: tableHeight }}
    >
      <div style={{ width: totalContentWidth, height: totalContentHeight + headerHeight }}>
        <div
          className="flex sticky top-0 bg-gray-100 z-20 border-b"
          style={{ height: headerHeight, minHeight: headerHeight }}
        >
          {columns.map((col, colIndex) => {
            const isFrozenLeft = colIndex < frozenLeftCount
            const isFrozenRight = colIndex >= columns.length - frozenRightCount
            let leftOffset = 0
            let rightOffset = 0

            if (isFrozenLeft) {
              for (let i = 0; i < colIndex; i++) {
                leftOffset += columns[i].width
              }
            } else if (isFrozenRight) {
              for (let i = colIndex + 1; i < columns.length; i++) {
                rightOffset += columns[i].width
              }
            }

            return (
              <div
                key={col.key}
                className={`flex-shrink-0 flex-grow-0 px-4 py-3 font-semibold text-left text-sm border-r last:border-r-0
                  ${isFrozenLeft || isFrozenRight ? "sticky bg-gray-100 z-20 shadow-md" : ""}
                  ${isFrozenLeft ? "border-r-2 border-gray-300" : ""}
                  ${isFrozenRight ? "border-l-2 border-gray-300" : ""}
                `}
                style={{
                  width: col.width,
                  minWidth: col.width,
                  left: isFrozenLeft ? leftOffset : undefined,
                  right: isFrozenRight ? rightOffset : undefined,
                }}
              >
                {col.header}
              </div>
            )
          })}
        </div>

        <div className="relative" style={{ height: totalContentHeight }}>
          <div
            style={{
              transform: `translateY(${offset}px)`,
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
            }}
          >
            {visibleRows.map((row, rowIndex) => {
              const actualIndex = startIndex + rowIndex
              const isEvenRow = actualIndex % 2 === 0
              return (
                <div
                  key={actualIndex}
                  className={`flex w-full ${isEvenRow ? "bg-white" : "bg-gray-50"}`}
                  style={{ height: rowHeight, minHeight: rowHeight }}
                >
                  {columns.map((col, colIndex) => {
                    const isFrozenLeft = colIndex < frozenLeftCount
                    const isFrozenRight = colIndex >= columns.length - frozenRightCount
                    let leftOffset = 0
                    let rightOffset = 0

                    if (isFrozenLeft) {
                      for (let i = 0; i < colIndex; i++) {
                        leftOffset += columns[i].width
                      }
                    } else if (isFrozenRight) {
                      for (let i = colIndex + 1; i < columns.length; i++) {
                        rightOffset += columns[i].width
                      }
                    }

                    return (
                      <div
                        key={col.key}
                        className={`flex-shrink-0 flex-grow-0 border-b border-r last:border-r-0 px-4 py-2 text-sm truncate
                          ${isFrozenLeft || isFrozenRight ? "sticky z-10 shadow-md" : ""}
                          ${isFrozenLeft ? "border-r-2 border-gray-300" : ""}
                          ${isFrozenRight ? "border-l-2 border-gray-300" : ""}
                          ${isFrozenLeft || isFrozenRight ? (isEvenRow ? "bg-gray-100" : "bg-gray-200") : ""}
                        `}
                        style={{
                          width: col.width,
                          minWidth: col.width,
                          height: rowHeight,
                          left: isFrozenLeft ? leftOffset : undefined,
                          right: isFrozenRight ? rightOffset : undefined,
                        }}
                      >
                        {String(row[col.key])}
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
