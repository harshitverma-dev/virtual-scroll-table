import { VirtualizedTable } from "../virtualized-table.jsx"
import { rawTableData } from "../data/dummyData"


export default function TableHome() {

  const NUM_TARGET_ROWS = 1200
  const tableData = []
  for (let i = 0; i < NUM_TARGET_ROWS; i++) {
    const baseRow = { ...rawTableData[i % rawTableData.length], id: i + 1 }
    for (let j = 0; j < 51; j++) {
      baseRow[`extraCol${j + 1}`] = `Data R${i + 1} C${j + 1}`
    }
    tableData.push(baseRow)
  }

  let columns = Object.keys(tableData[0]).map((key) => {
    let width = 150 
    if (key === "elementName")
      width = 150
    else if (key === "description") width = 200
    else if (key === "codeCategory") width = 180
    else if (key === "orderStatus") width = 120
    else if (key === "itemType") width = 120
    else if (key === "source") width = 180
    else if (key === "status") width = 150
    else if (key === "length") width = 80
    else if (key === "finalAmount")
      width = 120 
    else if (key.startsWith("extraCol")) width = 120

    return {
      key: key,
      header: key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase()),
      width: width,
    }
  })

  const fixedLastColumns = ["length", "finalAmount"]
  const filteredColumns = columns.filter((col) => !fixedLastColumns.includes(col.key))

  const lengthCol = columns.find((col) => col.key === "length")
  const finalAmountCol = columns.find((col) => col.key === "finalAmount")

  if (lengthCol) filteredColumns.push(lengthCol)
  if (finalAmountCol) filteredColumns.push(finalAmountCol)

  columns = filteredColumns

  const frozenLeftCount = 2
  const frozenRightCount = 2

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Virtualized Data Table</h1>
      <div className="w-full max-w-6xl mx-auto">
        <VirtualizedTable
          data={tableData}
          columns={columns}
          rowHeight={40}
          headerHeight={48}
          frozenLeftCount={frozenLeftCount}
          frozenRightCount={frozenRightCount}
          tableHeight={600}
        />
      </div>
    </div>
  )
}
