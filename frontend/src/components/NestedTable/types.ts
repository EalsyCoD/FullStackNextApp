export interface Column {
  id: string
  name: string
}

export interface Row {
  id: number | string
  [key: string]: string | number | boolean | Row[] | undefined
  children?: Row[]
  isExpanded?: boolean
}

export interface TableData {
  columns: Column[]
  rows: Row[]
}

export interface NestedTableProps {
  data: TableData
}
