// UpdateWidget.tsx

import React, { useState } from 'react'
import { Widget } from '../../models/Widget'
import { updateWidgetApi } from '../apiClient'

interface UpdateWidgetProps {
  widget: Widget
  onUpdateWidget: (widgetId: number, updatedWidget: Widget) => void
}

export const UpdateWidget: React.FC<UpdateWidgetProps> = ({
  widget,
  onUpdateWidget,
}) => {
  const [updatedWidget, setUpdatedWidget] = useState({ ...widget })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUpdatedWidget((prevWidget) => ({ ...prevWidget, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const updatedWidgetFromApi = await updateWidgetApi(
        widget.id,
        updatedWidget
      )
      onUpdateWidget(widget.id, updatedWidgetFromApi) // Use the response from the API
    } catch (error: any) {
      console.log(error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={updatedWidget.name}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Price:
        <input
          type="number"
          name="price"
          value={updatedWidget.price}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Manufacturer:
        <input
          type="text"
          name="mfg"
          value={updatedWidget.mfg}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Number in stock:
        <input
          type="number"
          name="inStock"
          value={updatedWidget.inStock}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit">Update Widget</button>
    </form>
  )
}
