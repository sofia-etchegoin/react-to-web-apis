// @vitest-environment node

//widgets.test.ts
import { describe, it, expect, vi } from 'vitest'
import request from 'supertest'
import server from '../server.ts'
import * as db from '../db/db.ts'

vi.mock('../db/db')

describe('POST /api/v1/widgets', () => {
  it('responds with 200 even with missing fields', async () => {
    const sadWidget = {
      name: 'Sad Widget',
      price: '',
      mfg: '',
      inStock: '',
    }

    await request(server).post('/api/v1/widgets').send(sadWidget).expect(200)
  })
})
