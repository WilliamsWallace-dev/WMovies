
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

function App() {

  return (
    <>
    <React.StrictMode>
      <AppProvidor>
        <AppRoutes></AppRoutes>
      </AppProvidor>
    </React.StrictMode>
    </>
  )
  
}

export default App
