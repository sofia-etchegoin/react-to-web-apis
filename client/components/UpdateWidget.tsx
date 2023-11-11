//UpdateWidget.tsx component
import { useState } from 'react'
import { updateWidgetApi } from '../apiClient'

export function UpdateWidget() {
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
    try {
      await updateWidgetApi(formData)
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
      <h1>Update Widget</h1>
      <form onSubmit={handleSubmit} method="PATCH">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />

        <label htmlFor="price">Price:</label>
        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
        />

        <label htmlFor="mfg">Manufacturer:</label>
        <input
          type="text"
          name="mfg"
          value={formData.mfg}
          onChange={handleInputChange}
        />

        <label htmlFor="inStock">In Stock:</label>
        <input
          type="text"
          name="inStock"
          value={formData.inStock}
          onChange={handleInputChange}
        />
        <button type="submit">Update Widget</button>
      </form>
    </>
  )
}
