//App.tsx component

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { Widget } from '../../models/Widget'

import { AddWidget } from './AddWidget'

//API imports
import { getWidgetsApi, deleteWidgetApi } from '../apiClient'

function App() {
  const [widgets, setWidgets] = useState([] as Widget[])
  const [showAddWidgetForm, setShowAddWidgetForm] = useState(false)
  const [updateWidgetId, setUpdateWidgetId] = useState(null)

  useEffect(() => {
    async function getWidgetsDB() {
      const result = await getWidgetsApi()
      setWidgets(result)
    }
    getWidgetsDB()
  }, [])

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

  const handleUpdateWidget = (widgetId) => {
    setUpdateWidgetId(widgetId)
  }

  const handleUpdateFormSubmit = async (updatedWidget) => {
    try {
      await updateWidgetApi(updateWidgetId, updatedWidget)
      setUpdateWidgetId(null)
      const updatedWidgets = await getWidgetsApi()
      setWidgets(updatedWidgets)
    } catch (error: any) {
      console.log(error.message)
    }
  }

  return (
    <>
      <h1>Widgets for the win!</h1>
      <br />
      <button onClick={toggleAddWidgetForm}>Add Widget</button>
      {showAddWidgetForm && <AddWidget />}
      <div>
        {widgets.map((widget) => {
          return (
            <div key={widget.id}>
              <h2>Name: {widget.name}</h2>
              <h3>Price: {widget.price}</h3>
              <h3>Manufacturer: {widget.mfg}</h3>
              <h3>Number in stock: {widget.inStock}</h3>
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
