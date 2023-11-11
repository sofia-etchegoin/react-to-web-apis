//routes
import express from 'express'
import { addWidgetToDB, getWidgetsFromDb } from '../db/db.ts'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const widgets = await getWidgetsFromDb()
    res.json(widgets)
  } catch (error) {
    console.log(error.message)
  }
})

router.post('/', async (req, res) => {
  try {
    const widget = req.body
    const addWidget = await addWidgetToDB(widget)
    res.json(addWidget)
  } catch (error) {
    console.log(error.message)
  }
})

export default router
