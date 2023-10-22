import { TableColumn, TableColumnInfo, UserInfo } from '@/components/nested-table/types'

export interface DataItem {
  id: number
  values: UserInfo
  children: DataItem[]
}

export interface TableDataMock {
  columns: TableColumnInfo[]
  rows: DataItem[]
}

export const data: Readonly<TableDataMock> = {
  columns: [
    { id: TableColumn.ID, name: 'id', age: 'age' },
    { id: TableColumn.Name, name: 'name', age: 'age' },
    { id: TableColumn.Age, name: 'age', age: 'age' },
  ],
  rows: [
    {
      id: 1,
      values: {
        id: 1,
        name: 'John Doe',
        age: 30,
      },
      children: [
        {
          id: 11,
          values: {
            id: 11,
            name: 'Child 1',
            age: 5,
          },
          children: [],
        },
        {
          id: 12,
          values: {
            id: 12,
            name: 'Child 2',
            age: 8,
          },
          children: [],
        },
      ],
    },
    {
      id: 2,
      values: {
        id: 2,
        name: 'Jane Smith',
        age: 25,
      },
      children: [
        {
          id: 21,
          values: {
            id: 21,
            name: 'Child 3',
            age: 3,
          },
          children: [],
        },
      ],
    },
  ],
}
