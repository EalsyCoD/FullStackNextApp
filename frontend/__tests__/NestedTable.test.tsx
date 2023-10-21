import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { NestedTable } from '@/components'
import { data } from '@/shared/mocks/DataNestedTable.mock'
import '@testing-library/jest-dom'

test('displays table and data', () => {
  render(<NestedTable data={data} />)

  const table = screen.getByRole('table')
  expect(table).toBeInTheDocument()

  const rows = screen.getAllByRole('row')
  expect(rows).toHaveLength(data.rows.length + 1)

  const addButton = screen.getByText('Add line')
  expect(addButton).toBeInTheDocument()
})

test('adds a new row when you click on the "Add row" button', () => {
  render(<NestedTable data={data} />)

  const rows = screen.getAllByRole('row')
  const initialRowCount = rows.length

  const addButton = screen.getByText('Add line')
  fireEvent.click(addButton)

  waitFor(() => {
    const updatedRows = screen.getAllByRole('row')
    expect(updatedRows).toHaveLength(initialRowCount + 1)

    const newRow = updatedRows[initialRowCount]

    const expectedName = 'text_on_new_line'
    const expectedAge = 'text_on_new_line'

    expect(newRow).toHaveTextContent(expectedName)
    expect(newRow).toHaveTextContent(expectedAge)
  })
})

test('expands and collapses rows when you click the Expand/Collapse button', () => {
  render(<NestedTable data={data} />)

  const expandButtons = screen.getAllByText('Expand')
  const firstExpandButton = expandButtons[0]

  const collapsedRows = screen.queryAllByText('Expand')
  expect(collapsedRows).toHaveLength(2)

  fireEvent.click(firstExpandButton)

  const expandedRows = screen.queryAllByText('Expanded')
  expect(expandedRows).toHaveLength(1)

  fireEvent.click(firstExpandButton)

  const restoredRows = screen.queryAllByText('Collapsed')
  expect(restoredRows).toHaveLength(2)
})
