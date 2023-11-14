// @vitest-environment jsdom
// import { describe, it, expect, vi } from 'vitest'
// import nock from 'nock'
// import {
//   render,
//   screen,
//   waitForElementToBeRemoved,
// } from '@testing-library/react/pure'

// import './test/setup.ts'

// import * as Models from '../../models/Widget.ts'
// import { AddWidget } from './AddWidget.tsx'

// const mockAddedWidgetData = {
//   id: 1,
//   name: 'Fake Widget',
//   price: 20,
//   mfg: 'Fake Manufacturer',
//   inStock: 10,
// } as Models.Widget

// describe('<AddWidget/>', () => {
//   it('shows a loader', async () => {
//     const scope = nock('http://localhost/')
//       .post('/api/v1/widgets/')
//       .reply(200, mockAddedWidgetData)

//     render(<AddWidget />)
//     const message = screen.getByText('Loading...')
//     await waitForElementToBeRemoved(message)

//     // a request has been made that matched this pattern
//     expect(scope.isDone()).toBe(true)
//   })
// })
