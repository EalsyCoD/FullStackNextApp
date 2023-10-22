export enum TableColumn {
  ID = 'id',
  Name = 'name',
  Age = 'age',
}

export interface UserInfo {
  id: string | number
  name: string
  age: number
}

export type Row = {
  id: string | number
  children?: Row[]
  values: UserInfo
  isExpanded?: boolean
}

export interface TableColumnInfo {
  id: TableColumn;
  name: string;
  age: string;
}
export interface TableData {
  columns: TableColumnInfo[];
  rows: Row[];
}

export interface NestedTableProps {
  data: TableData
}
