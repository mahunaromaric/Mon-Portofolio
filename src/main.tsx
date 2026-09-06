import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Admin from './Admin'
import { Maintenance } from './components/Maintenance'
import './index.css'

// VITE_MAINTENANCE_MODE=true → tout le site (admin inclus) affiche la page d'attente.
// En local, laisser à 'false' pour continuer la reconstruction.
const MAINTENANCE_MODE = import.meta.env.VITE_MAINTENANCE_MODE === 'true'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {MAINTENANCE_MODE ? (
      <Maintenance />
    ) : (
      <BrowserRouter>
        <Routes>
          <Route path="/admin/*" element={<Admin />} />
          <Route path="*" element={<App />} />
        </Routes>
      </BrowserRouter>
    )}
  </React.StrictMode>,
)
