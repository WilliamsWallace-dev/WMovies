
// import Header from './components/Header'
// import SwiperDescriptionItem from './components/SwiperDescriptionItem'
import SwiperMain from './components/SwiperMain'
// import SwiperListItem from './components/SwiperListItem'
import SwiperList from './components/SwiperList'
import Header from './components/Header'

import './style/style.css'

import React from 'react'
import { AppProvidor } from './context/AppContext'

function App() {

  return (
    <>
    <React.StrictMode>
      <AppProvidor>
        <SwiperMain><Header></Header></SwiperMain>
        <SwiperList typeSwiper='Filmes'></SwiperList>
        <SwiperMain></SwiperMain>
        <SwiperList typeSwiper='Séries'></SwiperList>
        <SwiperMain></SwiperMain>
        <SwiperList typeSwiper='Animes'></SwiperList>
      </AppProvidor>
    </React.StrictMode>
    </>
  )
  
}

export default App
