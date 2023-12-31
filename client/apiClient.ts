//apiClient.ts
/* eslint-disable @typescript-eslint/no-unused-vars */
import request from 'superagent'
import { Widget } from '../models/Widget'

const widgetUrl = '/api/v1/widgets/'

export async function getWidgetsApi(): Promise<Widget[]> {
  const response = await request.get(widgetUrl)
  console.log(response)
  return response.body
}

export async function addWidgetApi(widget: Widget) {
  const response = await request.post(widgetUrl).send(widget)
  return response.body
}

export async function deleteWidgetApi(widgetId: number) {
  const response = await request.delete(`${widgetUrl}/${widgetId}`)
  return response.body
}

export async function updateWidgetApi(widgetId: number, updatedWidget: Widget) {
  const response = await request
    .patch(`/api/v1/widgets/${widgetId}`)
    .send(updatedWidget)
  return response.body
}
