/* eslint-disable @typescript-eslint/no-unused-vars */
import request from 'superagent'
import { Widget } from '../models/Widget'

const widgetUrl = '/api/v1/widgets/'

export async function getWidgetsApi(): Promise<Widget[]> {
  const response = await request.get(widgetUrl)
  return response.body
}

export async function addWidgetApi(widget: Promise<Widget>) {
  const response = await request.post(widgetUrl).send(widget)
  return response.body
}
