//routes
import express from 'express'
import {
  addWidgetToDB,
  deleteWidgetFromDb,
  getWidgetsFromDb,
  updateWidgetInDb,
} from '../db/db.ts'
import { updateWidgetApi } from '../../client/apiClient.ts'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const widgets = await getWidgetsFromDb()
    res.json(widgets)
  } catch (error: any) {
    console.log(error.message)
  }
})

router.post('/', async (req, res) => {
  try {
    const widget = req.body
    const addWidget = await addWidgetToDB(widget)
    res.json(addWidget)
  } catch (error: any) {
    console.log(error.message)
  }
})

router.delete('/:id', async (req, res) => {
  const widgetId = parseInt(req.params.id, 10)

  try {
    await deleteWidgetFromDb(widgetId)
    res.status(204).send()
  } catch (error: any) {
    console.log(error.message)
    res.status(500).send('Whoops, there was an error')
  }
})

export default router
