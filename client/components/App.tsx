import React, { useEffect, useState } from 'react'
import { Widget } from '../../models/Widget'
import { getWidgetsApi } from '../apiClient'
import { AddWidget } from './AddWidget'
import { deleteWidgetApi } from '../apiClient'

function App() {
  const [widgets, setWidgets] = useState([] as Widget[])
  const [showAddWidgetForm, setShowAddWidgetForm] = useState(false)

  console.log('These are the widgets', widgets)
  useEffect(() => {
    async function getWidgetsDB() {
      const result = await getWidgetsApi()
      setWidgets(result)
    }
    getWidgetsDB()
  }, [])
  console.log('Widgets are rendering')

  const toggleAddWidgetForm = () => {
    setShowAddWidgetForm(!showAddWidgetForm)
  }

  const handleDeleteWidget = async (widgetId) => {
    try {
      await deleteWidgetApi(widgetId)
      const updatedWidgets = widgets.filter((widget) => widget.id !== widgetId)
      setWidgets(updatedWidgets)
    } catch (error: any) {
      console.log(error.message)
    }
  }

  return (
    <>
      <h1>Widgets for the win!</h1>
      <button onClick={toggleAddWidgetForm}>Add Widget</button>
      {showAddWidgetForm && <AddWidget />}
      <div>
        {widgets.map((widget) => {
          return (
            <div key={widget.id}>
              <h2>{widget.name}</h2>
              <h3>{widget.price}</h3>
              <h3>{widget.mfg}</h3>
              <h3>{widget.inStock}</h3>
              <button onClick={() => handleDeleteWidget(widget.id)}>
                Delete widget
              </button>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default App
