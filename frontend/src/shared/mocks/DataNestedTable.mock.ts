import { TableData } from '@/components/NestedTable/types'

export const data: TableData = {
  columns: [
    { id: 'name', name: 'Name' },
    { id: 'age', name: 'Age' },
  ],
  rows: [
    {
      id: 1,
      name: 'John Doe',
      age: 30,
      children: [
        {
          id: 11,
          name: 'Child 1',
          age: 5,
        },
        {
          id: 12,
          name: 'Child 2',
          age: 8,
        },
      ],
    },
    {
      id: 2,
      name: 'Jane Smith',
      age: 25,
      children: [
        {
          id: 21,
          name: 'Child 3',
          age: 3,
        },
      ],
    },
  ],
}
