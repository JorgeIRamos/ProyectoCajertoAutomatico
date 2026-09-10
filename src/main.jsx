import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Rutas from './route.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Rutas />
  </StrictMode>,
)
