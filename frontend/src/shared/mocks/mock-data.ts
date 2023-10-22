import { TableData } from '@/components/nested-table/types'

export const data: Readonly<TableData> = {
  columns: [
    { id: 'id', name: 'ID', displayName: 'id' },
    { id: 'name', name: 'Name', displayName: 'name' },
    { id: 'age', name: 'Age', displayName: 'age' },
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
