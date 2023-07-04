import CardMain from "../CardMain";
import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/autoplay"

import "./swiperMain.css"

// import Swiper core and required modules
import SwiperCore,{ EffectFade,Navigation, Pagination, Scrollbar, A11y,Autoplay } from '../../../node_modules/swiper';
import { useSwiper } from 'swiper/react';

SwiperCore.use([Pagination, Autoplay]);

// import Header from "../Header";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { AppContextType, CardType, TypeContent } from "../../Types";
import CardDescription from "../CardDescription";



export default function SwiperMain({header = false, typeContent, typeSwiper} : {header? : boolean, typeContent : string, typeSwiper : "CardMain" | "CardDescription"}){

    const [swiperMain,setSwiperMain] = useState([] as CardType[])
    
    const {moviesList,seriesList,animesList} = useContext(AppContext) as AppContextType;

    const swiperRef = React.useRef<SwiperCore>();

    // console.log(typeContent)


    const stopSwiper = ()=>{
        if (swiperRef.current) swiperRef.current.autoplay.stop();
        console.log("stop")
    }
    const startSwiper = ()=>{
        if (swiperRef.current) swiperRef.current.autoplay.start();
        console.log("start")
    }

    const onInit = (Swiper: SwiperCore): void => {
        swiperRef.current = Swiper;
        console.log("Inciou")
      };

    useEffect(()=>{

            switch (typeContent) {
                case TypeContent.Filme : 
                    setSwiperMain(...[moviesList])
                    break;
                case TypeContent.Série : 
                    setSwiperMain(...[seriesList])
                    break;
                case TypeContent.Anime : 
                    setSwiperMain(animesList)
                    break;
            }
            
    },[swiperMain,typeContent,moviesList])
    

    if(swiperMain?.length == 0 ){
        return (
            <></>
        )
    } else return(
        <>
         {/* <section className="videoContainer">
                <iframe width="1280" height="720" src="https://www.youtube.com/embed/_fY3l9AKPa0" title="Touch of Heaven - David Funk | Worship Night" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        </section> */}
        <section className= {header ? typeSwiper == "CardMain" ? "SwiperMain" : "SwiperTertiary" : "SwiperSecondary my-5"}>
            <Swiper
                onInit={onInit}
                    // install Swiper modules
                modules={[EffectFade, Navigation, Pagination, Scrollbar, A11y , Autoplay]}
                spaceBetween={50}
                effect={"fade"}
                centeredSlides={true}
                autoplay={{
                delay: 7000,
                disableOnInteraction: false,
                }}
                loop={true}
                slidesPerView={1}
                // navigation = {true}
                pagination={{ dynamicBullets: true, clickable: true }}
                scrollbar={{ draggable: true }}
                // onSwiper={(swiper) => console.log(swiper)}
                // onSlideChange={() => console.log('slide change')}
                // onAutoplayPause = {(swiper)=>{console.log("pAUSE")}}
                className="mySwiper"
                style={{position:"absolute",top:"0"}}
            >   
                {
                   swiperMain && swiperMain.map((card,index)=>{                        
                        if(index < 3 && typeSwiper == "CardMain"){
                            return (
                                <>
                                    <SwiperSlide><CardMain header={header} key = {card.id} card = {card}></CardMain></SwiperSlide>
                                </>
                            )
                        } else if(index < 3 && typeSwiper == "CardDescription") 
                            return (
                                <>
                                    <SwiperSlide><CardDescription  key = {card.id} cardContent = {card} stopSwiper = {stopSwiper} startSwiper = {startSwiper}></CardDescription></SwiperSlide>
                                </>
                        )
                        
                    })
                }
            </Swiper>     
        </section>
           
        </>
    )
}