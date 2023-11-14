//AddWidget-mock.test.tsx

// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest'
import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react/pure'
import './test/setup.ts'

import * as api from '../apiClient.ts'
import * as Models from '../../models/Widget.ts'
import { AddWidget } from './AddWidget.tsx'

//isolate out System Under Test (SUT)

vi.mock('../apiClient.ts')

const mockAddedWidgetData = {
  name: 'Fake Widget',
  price: 20,
  mfg: 'Fake Manufacturer',
  inStock: 10,
} as Models.NewWidget

describe('<AddWidget/>', () => {
  it('adds a widget on form submission', async () => {
    //ARRANGE
    vi.mocked(api.addWidgetApi).mockImplementation(async () => {
      return mockAddedWidgetData
    })

    //ACT
    render(<AddWidget />)
    const nameInput = screen.getByLabelText('Name:')
    const priceInput = screen.getByLabelText('Price:')
    const manufacturerInput = screen.getByLabelText('Manufacturer:')
    const inStock = screen.getByLabelText('In Stock:')
    const button = screen.getByRole('button')

    fireEvent.change(nameInput, { target: { value: 'Fake Widget' } })
    fireEvent.change(priceInput, {
      target: { value: mockAddedWidgetData.price },
    })
    fireEvent.change(manufacturerInput, {
      target: { value: 'Fake Manufacturer' },
    })
    fireEvent.change(inStock, {
      target: { value: mockAddedWidgetData.inStock },
    })
    fireEvent.click(button)

    // await waitForElementToBeRemoved(() => screen.getByText('Adding Widget...'))

    //ASSERT
    expect(api.addWidgetApi).toHaveBeenCalled(mockAddedWidgetData)

    // expect(screen.getByText('Fake Widget')).toBeInTheDocument()
    // expect(screen.getByText('Price: 20')).toBeInTheDocument()
    // expect(
    //   screen.getByText('Manufacturer: Fake Manufacturer')
    // ).toBeInTheDocument()
    // expect(screen.getByText('Number in stock: 10')).toBeInTheDocument()
  })
})
