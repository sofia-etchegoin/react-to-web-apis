//db.test.ts

// @vitest-environment node
import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'
import connection from './connection.ts'
import { getWidgetsFromDb } from './db.ts'

beforeAll(async () => {
  await connection.migrate.latest()
})

beforeEach(async () => {
  await connection.seed.run()
})

afterAll(async () => {
  await connection.destroy()
})

describe('getWidgets', () => {
  it('returns the correct widgets array', async () => {
    const widgets = await getWidgetsFromDb()

    expect(widgets).toHaveLength(3)
    expect(widgets[0]).toHaveProperty('mfg')
    expect(widgets[1].inStock).toBe(8)
  })
})
