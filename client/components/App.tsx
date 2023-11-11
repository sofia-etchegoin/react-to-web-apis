//App.tsx component

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { Widget } from '../../models/Widget'

import { AddWidget } from './AddWidget'
import { UpdateWidget } from './UpdateWidget'

//API imports
import { getWidgetsApi } from '../apiClient'
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
      <div>
        <Link to="/update">Update a Widget</Link>
      </div>
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
