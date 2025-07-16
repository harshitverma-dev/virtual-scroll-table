import React from "react"
import { cn } from "@/lib/utils"

export const TableHeader = React.memo(function TableHeader({
  frozenLeftColumns,
  visibleScrollableColumns,
  frozenRightColumns,
  headerHeight,
  scrollableOffsetLeft,
  totalFrozenLeftWidth,
  totalScrollableWidth,
}) {
  return (
    <div
      className="flex sticky top-0 bg-gray-100 z-20 border-b"
      style={{ height: headerHeight, minHeight: headerHeight }}
    >
      {frozenLeftColumns.map((col, colIndex) => {
        let leftOffset = 0
        for (let i = 0; i < colIndex; i++) {
          leftOffset += frozenLeftColumns[i].width
        }
        return (
          <div
            key={col.key}
            className={cn(
              "flex-shrink-0 flex-grow-0 px-4 py-3 font-semibold text-left text-xs border-r last:border-r-0",
              "sticky bg-gray-100 z-20 shadow-md border-r-2 border-gray-300",
            )}
            style={{
              width: col.width,
              minWidth: col.width,
              left: leftOffset,
            }}
          >
            {col.header}
          </div>
        )
      })}

      <div
        className="flex relative"
        style={{
          transform: `translateX(-${scrollableOffsetLeft}px)`,
          left: totalFrozenLeftWidth,
          width: totalScrollableWidth,
        }}
      >
        {visibleScrollableColumns.map((col) => (
          <div
            key={col.key}
            className={cn(
              "flex-shrink-0 flex-grow-0 px-4 py-3 font-semibold text-left text-xs border-r last:border-r-0",
            )}
            style={{
              width: col.width,
              minWidth: col.width,
            }}
          >
            {col.header}
          </div>
        ))}
      </div>

      {frozenRightColumns.map((col, colIndex) => {
        let rightOffset = 0
        for (let i = colIndex + 1; i < frozenRightColumns.length; i++) {
          rightOffset += frozenRightColumns[i].width
        }
        return (
          <div
            key={col.key}
            className={cn(
              "flex-shrink-0 flex-grow-0 px-4 py-3 font-semibold text-left text-xs border-r last:border-r-0",
              "sticky bg-gray-100 z-20 shadow-md border-l-2 border-gray-300",
            )}
            style={{
              width: col.width,
              minWidth: col.width,
              right: rightOffset,
            }}
          >
            {col.header}
          </div>
        )
      })}
    </div>
  )
})
