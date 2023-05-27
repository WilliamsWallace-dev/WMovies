import SwiperListItem from "../SwiperListItem";

//Type
import { AppContextType } from "../../Types";

// Context
import { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./swiperList.css"

// import required modules
import { Navigation } from "../../../node_modules/swiper";


export default function SwiperList ({typeSwiper} : {typeSwiper : string}){

    const {swiperMovies, SwiperMoviesNowPlaying} = useContext(AppContext) as AppContextType;

    useEffect(()=>{
        SwiperMoviesNowPlaying()
    },[])

    

    return(
        <>
            <section className="SwiperList ">
                <div className="menuSwiper flex-center my-1">
                    <h3 className="title mr-3">{typeSwiper}</h3>
                    <button className="starButton backgroundStar p3 mr-2">Lançamentos</button>
                    <button className="sumButton p3 mr-2">Novos Filmes</button>
                    <button className="popularButton p3 mr-2">Populares</button>
                </div>
                <Swiper
                    slidesPerView={"auto"}
                    centeredSlides={false}
                    spaceBetween={20}
                    navigation={true}
                    grabCursor={true}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Navigation]}
                    className="mySwiper"
                >  
                    <SwiperSlide style={{width : "100px"}}></SwiperSlide>
                    {
                        swiperMovies && swiperMovies.results.map((movie)=>{
                            return (
                                <>
                                    <SwiperSlide><SwiperListItem movie = {movie} key={movie.id} ></SwiperListItem></SwiperSlide>
                                </>
                            )
                        })
                    }
                    {/* <SwiperSlide style={{width : "100px"}}></SwiperSlide> */}
                </Swiper>
            </section>
            
        </>
    )
}