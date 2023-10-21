import { TableColumn, UserInfo } from "@/components/nested-table/types";

export interface MockRow {
  id: number;
  name: string;
  age: number;
  children: MockRow[];
}

export interface TableDataMock {
  columns: UserInfo[];
  rows: MockRow[];
}

export const data: Readonly<TableDataMock> = {
  columns: [
    { id: TableColumn.ID, name: 'id', age: 10 },
    { id: TableColumn.Name, name: 'name', age: 5 },
    { id: TableColumn.Age, name: 'age', age: 13 },
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
          children: [],
        },
        {
          id: 12,
          name: 'Child 2',
          age: 8,
          children: [],
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
          children: [],
        },
      ],
    },
  ],
};