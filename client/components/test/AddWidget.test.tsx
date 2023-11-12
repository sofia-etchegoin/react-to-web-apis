import { describe, it, expect, vi } from 'vitest'
import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import './setup.ts'

import * as api from '../../apiClient.ts'
import * as Models from '../../../models/Widget.ts'
import { AddWidget } from '../AddWidget.tsx'

//isolate out System Under Test (SUT)

vi.mock('../../apiClient.ts')

const mockAddedWidget = {
  id: 1,
  name: 'Fake Widget',
  price: 20,
  mfg: 'Fake Manufacturer',
  inStock: 10,
} as Models.Widget

describe('<AddWidget/>', () => {
  it('adds a widget on form submission', async () => {
    //ARRANGE
    vi.mocked(api.addWidgetApi).mockImplementation(async () => {
      return mockAddedWidget
    })

    //ACT
    render(<AddWidget />)
    const nameInput = screen.getByLabelText('Name:')
    const priceInput = screen.getByLabelText('Price:')
    const manufacturerInput = screen.getAllByLabelText('Manufacturer:')
    const inStock = screen.getByLabelText('Number in stock:')

    fireEvent.change(nameInput, { target: { value: 'Fake Widget' } })
    fireEvent.change(priceInput, { target: { value: '20' } })
    fireEvent.change(manufacturerInput, {
      target: { value: 'Fake Manufacturer' },
    })
    fireEvent.change(inStock, { target: { value: '10' } })

    await waitForElementToBeRemoved(() => screen.getByText('Adding Widget...'))

    //ASSERT
    expect(api.addWidgetApi).toHaveBeenCalled()

    expect(screen.getByText('Fake Widget')).toBeInTheDocument()
    expect(screen.getByText('Price: 20')).toBeInTheDocument()
    expect(
      screen.getByText('Manufacturer: Fake Manufacturer')
    ).toBeInTheDocument()
    expect(screen.getByText('Number in stock: 10')).toBeInTheDocument()
  })
})
