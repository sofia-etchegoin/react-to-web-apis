import { useEffect, useState } from 'react'
import { Widget } from '../../models/Widget'
import { getWidgetsApi } from '../apiClient'

function App() {
  const [widgets, setWidgets] = useState([] as Widget[])
  console.log('These are the widgets', widgets)
  useEffect(() => {
    async function getWidgetsDB() {
      const result = await getWidgetsApi()
      setWidgets(result)
    }
    getWidgetsDB()
  }, [])
  console.log('Widgets are rendering')

  return (
    <>
      <h1>Widgets for the win!</h1>
      <div>
        {widgets.map((widget) => {
          return (
            <div key={widget.id}>
              <h2>{widget.name}</h2>
              <h3>{widget.price}</h3>
              <h3>{widget.mfg}</h3>
              <h3>{widget.inStock}</h3>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default App
