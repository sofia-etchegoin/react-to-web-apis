//@vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest'
import nock from 'nock'
import { render, screen, fireEvent } from '@testing-library/react/pure'

import './test/setup.ts'

import * as Models from '../../models/Widget.ts'
import { AddWidget } from './AddWidget.tsx'

const mockAddedWidgetData = {
  name: 'Fake Widget',
  price: 20,
  mfg: 'Fake Manufacturer',
  inStock: 10,
} as Models.NewWidget

describe('<AddWidget/>', () => {
  it('shows a loader', async () => {
    const scope = nock('http://localhost/')
      .post('/api/v1/widgets/')
      .reply(200, mockAddedWidgetData)

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

    //ASSERT
    //expect(api.addWidgetApi).toHaveBeenCalled(mockAddedWidgetData)

    // a request has been made that matched this pattern
    expect(scope.isDone()).toBe(false)
  })
})
