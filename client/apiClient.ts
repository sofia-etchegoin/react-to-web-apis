/* eslint-disable @typescript-eslint/no-unused-vars */
import request from 'superagent'
import { Widget } from '../models/Widget'

const widgetUrl = '/api/v1/widgets/'

export async function getWidgetsApi(): Promise<Widget[]> {
  const response = await request.get(widgetUrl)
  return response.body
}
