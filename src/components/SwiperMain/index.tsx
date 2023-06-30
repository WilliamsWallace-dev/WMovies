import CardMain from "../CardMain";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/autoplay"

import "./swiperMain.css"

// import Swiper core and required modules
import swiper, { EffectFade,Navigation, Pagination, Scrollbar, A11y,Autoplay } from '../../../node_modules/swiper';
// import Header from "../Header";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { AppContextType, CardType, TypeContent } from "../../Types";
import CardDescription from "../CardDescription";


export default function SwiperMain({header = false, typeContent, typeSwiper} : {header? : boolean, typeContent : string, typeSwiper : "CardMain" | "CardDescription"}){

    const {moviesList,seriesList,animesList} = useContext(AppContext) as AppContextType;

    const [swiperMain,setSwiperMain] = useState<CardType[] | null>(null)

    useEffect(()=>{

            switch (typeContent) {
            case TypeContent.Filme : 
                setSwiperMain(moviesList)
                break;
            case TypeContent.Série : 
                setSwiperMain(seriesList)
                break;
            case TypeContent.Anime : 
                setSwiperMain(animesList)
                break;
            }
            
    },[typeContent,moviesList,animesList,seriesList])

    if(swiperMain?.length ==0 ){
        return (
            <></>
        )
    } else return(
        <>
        <section className= {header ? typeSwiper == "CardMain" ? "SwiperMain" : "SwiperTertiary" : "SwiperSecondary my-5"}>
            <Swiper
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
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
                onAutoplayPause = {(swiper)=>{console.log("pAUSE")}}
                className="mySwiper"
                style={{position:"absolute",top:"0"}}
            >
                {
                   swiperMain && swiperMain.map((card,index)=>{
                        if(index < 3 && typeSwiper == "CardMain"){
                            return (
                                <>
                                    <SwiperSlide><CardMain header={header} key = {index} card = {card}></CardMain></SwiperSlide>
                                </>
                            )
                        } else if(index < 3 && typeSwiper == "CardDescription") return (
                            <>
                                <SwiperSlide><CardDescription  key = {index} cardContent = {card}></CardDescription></SwiperSlide>
                            </>
                        )
                        
                    })
                }
            </Swiper>     
        </section>
           
        </>
    )
}