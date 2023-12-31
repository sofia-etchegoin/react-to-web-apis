//AddWidget.tsx Component

import { useState } from 'react'
import { addWidgetApi } from '../apiClient'
import { Widget } from '../../models/Widget'

export function AddWidget() {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    mfg: '',
    inStock: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Submitted')
    try {
      await addWidgetApi(formData)
      setFormData({
        name: '',
        price: '',
        mfg: '',
        inStock: '',
      })
    } catch (error: any) {
      console.log(error.message)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} method="POST">
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />

        <label htmlFor="price">Price:</label>
        <input
          id="price"
          type="text"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
        />

        <label htmlFor="mfg">Manufacturer:</label>
        <input
          id="mfg"
          type="text"
          name="mfg"
          value={formData.mfg}
          onChange={handleInputChange}
        />

        <label htmlFor="inStock">In Stock:</label>
        <input
          id="inStock"
          type="text"
          name="inStock"
          value={formData.inStock}
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  )
}
