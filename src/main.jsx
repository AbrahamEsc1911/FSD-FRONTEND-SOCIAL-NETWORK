import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { PassportProvider } from './Context/Passport/PassportContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <PassportProvider >
        <App />
      </PassportProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
