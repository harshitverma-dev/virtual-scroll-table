import React from "react"
import { TableCell } from "./table-cell"

export const TableRow = React.memo(function TableRow({
  row,
  frozenLeftColumns,
  visibleScrollableColumns,
  frozenRightColumns,
  rowIndex,
  rowHeight,
  isEvenRow,
  scrollableOffsetLeft,
  totalFrozenLeftWidth,
  totalScrollableWidth,
}) {
  return (
    <div
      className={`flex w-full ${isEvenRow ? "bg-white" : "bg-gray-50"}`}
      style={{ height: rowHeight, minHeight: rowHeight }}
    >
  
      {frozenLeftColumns.map((col, colIndex) => {
        let leftOffset = 0
        for (let i = 0; i < colIndex; i++) {
          leftOffset += frozenLeftColumns[i].width
        }
        return (
          <TableCell
            key={col.key}
            column={col}
            value={row[col.key]}
            rowHeight={rowHeight}
            isFrozenLeft={true}
            isFrozenRight={false}
            leftOffset={leftOffset}
            rightOffset={0} 
            isEvenRow={isEvenRow}
          />
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
          <TableCell
            key={col.key}
            column={col}
            value={row[col.key]}
            rowHeight={rowHeight}
            isFrozenLeft={false}
            isFrozenRight={false}
            leftOffset={0} 
            rightOffset={0} 
            isEvenRow={isEvenRow}
          />
        ))}
      </div>

      {frozenRightColumns.map((col, colIndex) => {
        let rightOffset = 0
        for (let i = colIndex + 1; i < frozenRightColumns.length; i++) {
          rightOffset += frozenRightColumns[i].width
        }
        return (
          <TableCell
            key={col.key}
            column={col}
            value={row[col.key]}
            rowHeight={rowHeight}
            isFrozenLeft={false}
            isFrozenRight={true}
            leftOffset={0}
            rightOffset={rightOffset}
            isEvenRow={isEvenRow}
          />
        )
      })}
    </div>
  )
})
