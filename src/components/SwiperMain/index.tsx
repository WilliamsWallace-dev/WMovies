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


export default function SwiperMain({header = false, typeSwiper} : {header? : boolean, typeSwiper : string}){

    const {moviesList,seriesList,animesList} = useContext(AppContext) as AppContextType;

    const [swiperMain,setSwiperMain] = useState <CardType[] | null>(null)

    useEffect(()=>{
        switch (typeSwiper) {
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

    return(
        <>
        <section className= {header ? "SwiperMain" : "SwiperSecondary my-5"}>
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
                        if(index < 3)
                        return (
                            <>
                                <SwiperSlide><CardMain key = {card.id} card = {card}></CardMain></SwiperSlide>
                            </>
                        )
                    })
                }
            </Swiper>     
        </section>
           
        </>
    )
}