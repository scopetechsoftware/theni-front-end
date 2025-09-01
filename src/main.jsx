import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import DataContextProvider from './Context/DataContext.jsx'
import AppRoutes from './AppRoutes/AppRoutes.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DataContextProvider>
      <AppRoutes/>
     
    </DataContextProvider>
  </StrictMode>
)
