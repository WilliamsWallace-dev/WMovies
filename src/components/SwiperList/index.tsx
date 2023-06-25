import Card from "../Card";

//Type
import { AppContextType, CardType, SearchTMDBType, TypeContent } from "../../Types";

// Context
import { useContext, useEffect, useState } from "react";
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
import { Link, useParams } from "react-router-dom";




export default function SwiperList ({typeSwiper, id} : {typeSwiper? : string, id? : string}){

    const {moviesList,seriesList,animesList} = useContext(AppContext) as AppContextType;

    const [swiperList,setSwiperList] = useState <CardType[] | null>(null)

    if(typeSwiper == undefined){
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const {typeContent} = useParams();
        typeSwiper = typeContent

        console.log(typeSwiper)
    }

    useEffect(()=>{
        switch (typeSwiper) {
            case TypeContent.Filme : 
                setSwiperList(moviesList)
                break;
            case TypeContent.Série : 
                setSwiperList(seriesList)
                break;
            case TypeContent.Anime : 
                setSwiperList(animesList)
                break;
        }
    },[moviesList,seriesList,animesList])

    

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
                    spaceBetween={24}
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
                        swiperList && swiperList.map((movie)=>{
                            return (
                                <>
                                    <SwiperSlide><Link to={!id ? `${typeSwiper}/${movie.id}` : `../${typeSwiper}/${movie.id}` }><Card card = {movie} key={movie.id} ></Card></Link></SwiperSlide>
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