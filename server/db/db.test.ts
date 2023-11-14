//db.test.ts

// @vitest-environment node
import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'
import connection from './connection.ts'
import { addWidgetToDB, getWidgetsFromDb } from './db.ts'

beforeAll(async () => {
  await connection.migrate.latest()
})

beforeEach(async () => {
  await connection.seed.run()
})

afterAll(async () => {
  await connection.destroy()
})

describe('addWidgets', () => {
  it('adds a widget to the database', async () => {
    //ARRANGE
    const widgetToAdd = {
      name: 'Added Widget',
      price: 1000,
      mfg: 'Widget Manufacturer',
      inStock: 1,
    }

    //ACT
    await addWidgetToDB(widgetToAdd)

    //ASSERT
    const widgetsInDb = await getWidgetsFromDb()
    const addedWidget = widgetsInDb.find(
      (widget) => widget.name === widgetToAdd.name
    )

    expect(addedWidget?.name).toBe(widgetToAdd.name)
    expect(addedWidget?.price).toBe(widgetToAdd.price)
    expect(addedWidget?.mfg).toBe(widgetToAdd.mfg)
    expect(addedWidget?.inStock).toBe(widgetToAdd.inStock)
  })
})
// Need a test for the addWidgetToDB function, please?
