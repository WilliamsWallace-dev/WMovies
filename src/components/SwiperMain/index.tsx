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

SwiperCore.use([Pagination, Autoplay]);

// import Header from "../Header";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { AppContextType, CardType, TypeContent } from "../../Types";
import CardDescription from "../CardDescription";
import { closeVideoUtil, openVideoUtil } from "../../utils/videoUtil";
import { Loading } from "../Loading";
import { VideoContainer } from "../VideoContainer";



export default function SwiperMain({header = false, typeContent, typeSwiper} : {header? : boolean, typeContent : string, typeSwiper : "CardMain" | "CardDescription"}){

    const [swiperMain,setSwiperMain] = useState([] as CardType[])
    
    const {mainCards} = useContext(AppContext) as AppContextType;

    const swiperRef = React.useRef<SwiperCore>();

    

    // console.log(typeContent)


    const stopSwiper = (videoKey : string) => {
        openVideoUtil(videoKey)
        if (swiperRef.current) swiperRef.current.autoplay.stop();
    }
    const startSwiper = ()=>{
        closeVideoUtil()
        if (swiperRef.current) swiperRef.current.autoplay.start();
    }

    const onInit = (Swiper: SwiperCore): void => {
        swiperRef.current = Swiper;
      };

    useEffect(()=>{
        // console.log(moviesList)
            switch (typeContent) {
                case TypeContent.Filme : 
                    setSwiperMain(mainCards.mainMovies)
                    break;
                case TypeContent.Série : 
                    setSwiperMain(mainCards.mainSeries)
                    break;
                case TypeContent.Anime : 
                    setSwiperMain(mainCards.mainAnimes)
                    break;
            }
            
            
    },[swiperMain,typeContent,mainCards])
    
    // console.log(moviesList)
    if(swiperMain?.length == 0 || swiperMain == undefined ){
        return (
            <>
                <Loading></Loading>
            </>
        )
    } else { 
        return(
        <>
        <VideoContainer></VideoContainer>
         {/* <section className="videoContainer videoContainerDisable">
                    <div className="iframeContainer relative">
                        <iframe width="1280" height="720" src="" title="" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                        <button className="closeButton" onClick={closeVideoUtil}>X</button>
                    </div>
            </section> */}
        <section className= {header ? typeSwiper == "CardMain" ? "SwiperMain" : "SwiperTertiary" : "SwiperSecondary "}>
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
                   swiperMain && swiperMain.sort((a,b)=>{ // Estrutura o vetor em ordem de adição dos cards
                        if(a.watchedToday < b.watchedToday) //Possibilitando mostrar sempre os ultimos 3 adicionados no Swiper.
                            return(1)
                            else return (-1)
                   }).map((card,index)=>{                        
                        if(index < 3 && typeSwiper == "CardMain"){
                            // console.log(card)
                            return (
                                <>
                                    <SwiperSlide><CardMain header={header} key = {card.id} card = {card}></CardMain></SwiperSlide>
                                </>
                            )
                        } else if(index < 3 && typeSwiper == "CardDescription") 
                            return (
                                <>
                                    <SwiperSlide><CardDescription  key = {card.id} cardContent = {card} stopSwiper = {stopSwiper}></CardDescription></SwiperSlide>
                                </>
                        )
                        
                    })
                }
            </Swiper>     
        </section>
           
        </>
    )
    }
}