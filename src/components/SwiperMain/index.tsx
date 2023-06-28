import CardMain from "../CardMain";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

import "./swiperMain.css"

// import Swiper core and required modules
import { EffectFade,Navigation, Pagination, Scrollbar, A11y,Autoplay } from '../../../node_modules/swiper';
// import Header from "../Header";
import { ReactNode, useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { AppContextType, CardType, TypeContent } from "../../Types";
import { useParams } from "react-router-dom";
import CardDescription from "../CardDescription";


export default function SwiperMain({header = false, typeContent, typeSwiper} : {header? : boolean, typeContent : string, typeSwiper : "CardMain" | "CardDescription"}){

    const {moviesList,seriesList,animesList} = useContext(AppContext) as AppContextType;

    const [swiperMain,setSwiperMain] = useState <CardType[] | null>(null)

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
    })
    // "SwiperSecondary my-5"
    return(
        <>
        <section className= {header ? typeSwiper == "CardMain" ? "SwiperMain" : "SwiperTertiary" : "SwiperSecondary my-5"}>
            <Swiper
                    // install Swiper modules
                modules={[EffectFade, Navigation, Pagination, Scrollbar, A11y , Autoplay]}
                spaceBetween={50}
                effect={"fade"}
                centeredSlides={true}
                autoplay={{
                delay: 10000,
                disableOnInteraction: false,
                }}
                loop={true}
                slidesPerView={1}
                // navigation
                pagination={{ dynamicBullets: true, clickable: true }}
                scrollbar={{ draggable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
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
                        } else if(index < 3 && typeSwiper == "CardDescription") return (
                            <>
                                <SwiperSlide><CardDescription  key = {card.id} cardContent = {card}></CardDescription></SwiperSlide>
                            </>
                        )
                        
                    })
                }
            </Swiper>     
        </section>
           
        </>
    )
}