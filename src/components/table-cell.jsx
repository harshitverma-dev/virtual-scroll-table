import React from "react"
import { cn } from "@/lib/utils"
import { CustomBadge } from "@/components/custom-badge"

const getStatusBadge = (key, value) => {
  if (key === "orderStatus") {
    if (value.includes("Ordered ①")) {
      return <CustomBadge className="bg-badgeSuccess text-white hover:bg-badgeSuccess/80">{"Ordered ①"}</CustomBadge>
    } else if (value.includes("Ordered ⑤ ⚠️") || value.includes("Ordered ③ ⚠️")) {
      return <CustomBadge className="bg-badgeWarning text-white hover:bg-badgeWarning/80">{"Ordered ⚠️"}</CustomBadge>
    }
  } else if (key === "status") {
    if (value.includes("Requested")) {
      return (
        <CustomBadge variant="outline" className="border-badgeInfo text-badgeInfo">
          {"Requested"}
        </CustomBadge>
      )
    } else if (value.includes("Discarded")) {
      return (
        <CustomBadge className="bg-badgeDiscarded text-white hover:bg-badgeDiscarded/80">{"Discarded"}</CustomBadge>
      )
    }
  }
  return String(value)
}

const getItemTypeBadge = (value) => {
  const normalizedValue = value.toLowerCase().replace(/\s/g, "")
  let colorClasses = "text-gray-700 border-gray-400"

  switch (normalizedValue) {
    case "boughtout":
      colorClasses = "text-itemTypeBoughtOut border-itemTypeBoughtOut"
      break
    case "transportation":
      colorClasses = "text-itemTypeTransportation border-itemTypeTransportation"
      break
    case "rawmaterial":
      colorClasses = "text-itemTypeRawMaterial border-itemTypeRawMaterial"
      break
    case "consulting":
      colorClasses = "text-itemTypeConsulting border-itemTypeConsulting"
      break
    case "production":
      colorClasses = "text-itemTypeProduction border-itemTypeProduction"
      break
    case "procurement":
      colorClasses = "text-itemTypeProcurement border-itemTypeProcurement"
      break
  }

  return (
    <CustomBadge variant="outline" className={colorClasses}>
      {value}
    </CustomBadge>
  )
}

const formatCodeCategory = (value) => {
  const parts = value.split("\n", 2) // Split by newline, max 2 parts
  if (parts.length === 2) {
    return (
      <>
        {parts[0]}
        <br />
        {parts[1]}
      </>
    )
  }
  return value // Return original value if no newline found
}

// Helper function to format source
const formatSource = (value) => {
  const parts = value.split(" ", 2) // Split only at the first space
  if (parts.length === 2) {
    return (
      <>
        {parts[0]}
        <br />
        {parts[1]}
      </>
    )
  }
  return value // Return original value if no space found
}

/**
 * Renders a single table cell.
 * @param {TableCellProps} props
 */
export const TableCell = React.memo(function TableCell({
  column,
  value,
  rowHeight,
  isFrozenLeft,
  isFrozenRight,
  leftOffset,
  rightOffset,
  isEvenRow,
}) {
  const isStatusColumn = column.key === "orderStatus" || column.key === "status"
  const isCodeCategoryColumn = column.key === "codeCategory"
  const isItemTypeColumn = column.key === "itemType"
  const isSourceColumn = column.key === "source"

  let cellContent

  if (isStatusColumn) {
    cellContent = getStatusBadge(column.key, String(value))
  } else if (isCodeCategoryColumn) {
    cellContent = formatCodeCategory(String(value))
  } else if (isItemTypeColumn) {
    cellContent = getItemTypeBadge(String(value))
  } else if (isSourceColumn) {
    cellContent = formatSource(String(value))
  } else {
    cellContent = String(value)
  }

  return (
    <div
      key={column.key}
      className={cn("flex-shrink-0 flex-grow-0 border-b border-r last:border-r-0 px-4 py-2 text-sm", {
        "sticky z-10 shadow-md": isFrozenLeft || isFrozenRight,
        "border-r-2 border-gray-300": isFrozenLeft,
        "border-l-2 border-gray-300": isFrozenRight,
        "bg-gray-100": (isFrozenLeft || isFrozenRight) && isEvenRow,
        "bg-gray-200": (isFrozenLeft || isFrozenRight) && !isEvenRow,
        "flex items-center justify-center": isStatusColumn || isItemTypeColumn, // Center badge content
        truncate: !isSourceColumn && !isCodeCategoryColumn, // Only truncate if NOT source or codeCategory column
      })}
      style={{
        width: column.width,
        minWidth: column.width,
        height: rowHeight,
        left: isFrozenLeft ? leftOffset : undefined,
        right: isFrozenRight ? rightOffset : undefined,
      }}
    >
      {cellContent}
    </div>
  )
})
