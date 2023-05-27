import SwiperMainItem from "../SwiperMainItem";
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
import { ReactNode, useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { AppContextType, MovieType } from "../../Types";


export default function SwiperMain({children} : {children? : ReactNode}){

    const {swiperMainMovies, SwiperMainMoviesNowPlaying} = useContext(AppContext) as AppContextType;


    useEffect(()=>{
        SwiperMainMoviesNowPlaying();
    },[])


    return(
        <>
        <section className= {children ? "SwiperMain mb-4" : "SwiperSecondary my-5"}>
            {children}
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
                    swiperMainMovies && swiperMainMovies.results.map((movie,index)=>{
                        if(index < 3)
                        return (
                            <>
                                <SwiperSlide><SwiperMainItem key = {movie.id} movie = {movie}></SwiperMainItem></SwiperSlide>
                            </>
                        )
                    })
                }
            </Swiper>     
        </section>
           
        </>
    )
}