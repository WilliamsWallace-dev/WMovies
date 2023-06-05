
// import Header from './components/Header'
// import SwiperDescriptionItem from './components/SwiperDescriptionItem'
import SwiperMain from './components/SwiperMain'
// import SwiperListItem from './components/SwiperListItem'
import SwiperList from './components/SwiperList'
import Header from './components/Header'

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
