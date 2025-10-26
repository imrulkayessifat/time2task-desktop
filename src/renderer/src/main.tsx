import './assets/main.css'

import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'

import App from './App'
import SheetProvider from './providers/sheet-provider'
import DialogProvider from './providers/dialog-provider'
import { QueryProvider } from './providers/query-provider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryProvider>
        <App />
        <SheetProvider />
        <DialogProvider />
      </QueryProvider>
    </BrowserRouter>
  </StrictMode>
)
