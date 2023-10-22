import React, { useState } from 'react'
import { orderBy } from 'lodash'
import { generateUniqueId } from '@/shared/utils/generateUniqueId'
import { Input, Button } from '@/components/ui'
import { SortDirections } from '@/shared/constants/enums'

import { UserInfo, Row, TableData, TableColumn } from './types'
import { TableRow } from './table-row'

export interface NestedTableProps {
  data: TableData
}

export const NestedTable: React.FC<NestedTableProps> = ({ data }) => {
  const [newRow, setNewRow] = useState<UserInfo>({
    id: generateUniqueId(),
    name: '',
    age: 0,
  })

  const [tableData, setTableData] = useState<TableData>(data)

  const [sortedColumn, setSortedColumn] = useState<TableColumn | null>(null)
  const [sortDirection, setSortDirection] = useState<SortDirections>(
    SortDirections.ASC,
  )

  const [expandedRows, setExpandedRows] = useState<number[]>([])

  const [filterText, setFilterText] = useState<string>('')

  const filterRows = (rows: Row[]) => {
    return filterText
      ? rows.filter(row => {
          const name = row.values.name
          const age = row.values.age

          return (
            name.toLowerCase().includes(filterText.toLowerCase()) ||
            age.toString().toLowerCase().includes(filterText.toLowerCase())
          )
        })
      : rows
  }

  const handleFilterTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value)
  }

  const addNewRow = () => {
    if (newRow.name && newRow.age) {
      const newDataRow: Row = {
        id: generateUniqueId(),
        values: {
          id: generateUniqueId(),
          name: newRow.name,
          age: newRow.age,
        },
        children: [],
      }

      const newData = {
        ...tableData,
        rows: [...tableData.rows, newDataRow],
      }

      setTableData(newData)
      setNewRow({ id: generateUniqueId(), name: '', age: 0 })
    }
  }

  const toggleSort = (column: TableColumn) => {
    if (column === sortedColumn) {
      setSortDirection(sortDirection =>
        sortDirection === SortDirections.ASC
          ? SortDirections.DESC
          : SortDirections.ASC,
      )
    } else {
      setSortedColumn(column)
      setSortDirection(SortDirections.ASC)
    }
  }

  const renderRows = (rows: Row[]) => {
    const filteredRows = filterRows(rows)
    const sortedRows = orderBy(
      filteredRows,
      [sortedColumn || '', 'values.name', 'values.age'],
      [sortDirection, sortDirection, sortDirection],
    )

    const toggleRow = (row: Row) => {
      row.isExpanded = !row.isExpanded
      setExpandedRows([...expandedRows])
    }

    return (
      <>
        {sortedRows.map(row => (
          <TableRow
            key={row.id}
            data={data}
            row={row}
            toggleRow={toggleRow}
            sortedColumn={sortedColumn}
            sortDirection={sortDirection}
            filterText={filterText}
            handleFilterTextChange={handleFilterTextChange}
          />
        ))}
      </>
    )
  }

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-between items-center">
        <div>
          <Input
            type="text"
            placeholder="Name"
            value={String(newRow.name)}
            onChange={e => setNewRow({ ...newRow, name: e.target.value })}
          />
          <Input
            type="text"
            placeholder="Age"
            value={String(newRow.age)}
            onChange={e =>
              setNewRow({ ...newRow, age: parseInt(e.target.value) || 0 })
            }
          />
          <Input
            type="text"
            placeholder="Filter"
            value={filterText}
            onChange={handleFilterTextChange}
          />
        </div>
        <div>
          <Button onClick={addNewRow}>Add line</Button>
        </div>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {data.columns.map(column => (
              <th
                key={column.id}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => toggleSort(column.id)}
              >
                <div className="flex items-center">
                  {column.name}
                  {sortedColumn === column.id && (
                    <span>
                      {sortDirection === SortDirections.ASC ? '↑' : '↓'}
                    </span>
                  )}
                  {!sortedColumn && <span className="pl-1">↑↓</span>}
                </div>
              </th>
            ))}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-tablecl divide-y divide-table">
          {renderRows(tableData.rows)}
        </tbody>
      </table>
    </div>
  )
}
