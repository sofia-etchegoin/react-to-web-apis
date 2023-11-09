//routes
import express from 'express'
import { getWidgets } from '../db/db.ts'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const widgets = await getWidgets()
    res.json(widgets)
  } catch (error) {
    console.log(error.message)
  }
})

export default router
