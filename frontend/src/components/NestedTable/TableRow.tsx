import React from 'react'
import { Column, Row, TableData } from './types'
import { SortDirections } from '@/shared/constants/enums'
import { NestedTable } from './Table'

interface TableRowProps {
  data: TableData
  row: Row
  toggleRow: (row: Row) => void
  sortedColumn: Column | null
  sortDirection: SortDirections
  filterText: string
  handleFilterTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const TableRow: React.FC<TableRowProps> = ({ data, row, toggleRow }) => {
  const renderChildrenTable = () => {
    if (row.isExpanded && row.children) {
      return (
        <tr className="border-b border-gray-200">
          <td
            colSpan={data.columns.length + 1}
            className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
          >
            <NestedTable data={{ columns: data.columns, rows: row.children }} />
          </td>
        </tr>
      )
    }
    return null
  }

  return (
    <React.Fragment key={row.id}>
      <tr className="border-b border-gray-200 bg-table">
        {data.columns.map(column => (
          <td
            key={column.id}
            className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
          >
            {String(row[column.id])}
          </td>
        ))}
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {row.children && (
            <div>
              <button onClick={() => toggleRow(row)} className="text-blue-500">
                {row.isExpanded ? 'Collapse' : 'Expand'}
              </button>
              {row.isExpanded ? (
                <span className="text-green-500 pl-2">Expanded</span>
              ) : (
                <span className="text-red-500 pl-2">Collapsed</span>
              )}
            </div>
          )}
        </td>
      </tr>
      {renderChildrenTable()}
    </React.Fragment>
  )
}
