// App.tsx

import React, { useEffect, useState } from 'react'
import { Widget } from '../../models/Widget'
import { AddWidget } from './AddWidget'
import { UpdateWidget } from './UpdateWidget'
import { getWidgetsApi, deleteWidgetApi, addWidgetApi } from '../apiClient'

function App() {
  const [widgets, setWidgets] = useState([] as Widget[])
  const [showAddWidgetForm, setShowAddWidgetForm] = useState(false)
  const [selectedWidget, setSelectedWidget] = useState(null)

  useEffect(() => {
    async function getWidgetsDB() {
      const result = await getWidgetsApi()
      setWidgets(result)
    }
    getWidgetsDB()
  }, [])

  const toggleAddWidgetForm = () => {
    setShowAddWidgetForm(!showAddWidgetForm)
    setSelectedWidget(null) // Reset selectedWidget when showing the add widget form
  }

  const handleAddWidget = async (widget) => {
    try {
      const addedWidget = await addWidgetApi(widget)
      setWidgets((prevWidgets) => [...prevWidgets, addedWidget])
      toggleAddWidgetForm()
    } catch (error: any) {
      console.log(error.message)
    }
  }

  const handleUpdateWidget = (widgetId, updatedWidget) => {
    const updatedWidgets = widgets.map((widget) =>
      widget.id === widgetId ? updatedWidget : widget
    )
    setWidgets(updatedWidgets)
    setSelectedWidget(null)
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
      <br />
      <button onClick={toggleAddWidgetForm}>Add Widget</button>
      {showAddWidgetForm && <AddWidget onAddWidget={handleAddWidget} />}
      {selectedWidget && (
        <UpdateWidget
          widget={selectedWidget}
          onUpdateWidget={handleUpdateWidget}
        />
      )}
      <div>
        {widgets.map((widget) => (
          <div key={widget.id}>
            <h2>Name: {widget.name}</h2>
            <h3>Price: {widget.price}</h3>
            <h3>Manufacturer: {widget.mfg}</h3>
            <h3>Number in stock: {widget.inStock}</h3>
            <button onClick={() => setSelectedWidget(widget)}>
              Update widget
            </button>
            <button onClick={() => handleDeleteWidget(widget.id)}>
              Delete widget
            </button>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
