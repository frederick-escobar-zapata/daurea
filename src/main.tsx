//TypeScript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

// Importamos Bootstrap CSS para que esté disponible en todo el sitio
import 'bootstrap/dist/css/bootstrap.min.css'
// (Opcional pero recomendado) Importamos los scripts de Bootstrap JS por si usas componentes interactivos
import 'bootstrap-icons/font/bootstrap-icons.css' // &lt;-- Iconos de Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import './index.css'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
