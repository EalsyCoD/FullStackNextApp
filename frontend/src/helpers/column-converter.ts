import { UserInfo, TableColumn } from '@/components/nested-table/types'

export function mapColumnToTableColumn(
  column: keyof UserInfo,
): TableColumn | undefined {
  switch (column) {
    case 'id':
      return TableColumn.ID
    case 'name':
      return TableColumn.Name
    case 'age':
      return TableColumn.Age
    default:
      return undefined
  }
}
