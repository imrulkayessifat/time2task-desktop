import './assets/main.css'

import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'

import App from './App'
import SheetProvider from './providers/sheet-provider'
import DialogProvider from './providers/dialog-provider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <SheetProvider />
      <DialogProvider />
    </BrowserRouter>
  </StrictMode>
)
