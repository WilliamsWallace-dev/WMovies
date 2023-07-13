

import './style/style.css'

import React from 'react'
import { AppProvidor } from './context/AppContext'
import {AppRoutes} from './router/index'
import { AuthProvider } from './context/AuthProvider'

function App() {

  return (
    <>
    <React.StrictMode>
      <AuthProvider>
        <AppProvidor>
          <AppRoutes></AppRoutes>
        </AppProvidor>
      </AuthProvider>
    </React.StrictMode>
    </>
  )
  
}

export default App
