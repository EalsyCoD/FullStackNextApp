import { UserInfo, TableColumn } from '@/components/nested-table/types'

/**
 * Maps a property name to the corresponding TableColumn enum value.
 *
 * @param {string} column - The name of the property to map.
 * @returns {TableColumn|undefined} The TableColumn enum value corresponding to the property name, or undefined if no mapping is found.
 */

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
