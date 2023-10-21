export enum TableColumn {
  ID = 'id',
  Name = 'name',
  Age = 'age',
}

export interface UserInfo {
  id: string
  name: string
  age: number
}

export type Row = {
  id: string | number
  children?: Row[]
  isExpanded?: boolean
}

export interface TableData {
  columns: UserInfo[]
  rows: Row[]
}

export interface NestedTableProps {
  data: TableData
}
