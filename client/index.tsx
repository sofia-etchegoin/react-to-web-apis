//index.tsx
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import App from './components/App.tsx'
import { UpdateWidget } from './components/UpdateWidget.tsx'

function Main() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/update" element={<UpdateWidget />} />
      </Routes>
    </Router>
  )
}

createRoot(document.getElementById('app') as HTMLElement).render(<Main />)
