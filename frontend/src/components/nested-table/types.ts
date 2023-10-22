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

export interface Column {
  id: string
  name: string
  displayName: string
}

export interface TableData {
  columns: Column[]
  rows: Row[]
}

export interface NestedTableProps {
  data: TableData
}
