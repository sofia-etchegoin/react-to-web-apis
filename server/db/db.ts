//db.ts

import connection from './connection.ts'

import { Widget } from '../../models/Widget.ts'

export function getWidgetsFromDb(db = connection): Promise<Widget[]> {
  return db<Widget>('widgets').select()
}

export function addWidgetToDB(widget: any) {
  return connection('widgets').insert(widget)
}

export function deleteWidgetFromDb(widgetId: number) {
  return connection('widgets').where({ id: widgetId }).delete()
}
