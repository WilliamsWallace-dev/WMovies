import Card from "../Card";

//Type
import { AppContextType, CardType, TypeContent } from "../../Types";

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
import { Link } from "react-router-dom";
import { Loading } from "../Loading";




export default function SwiperList ({typeSwiper = "Filme" , id} : {typeSwiper : string, id? : string}){

    const {moviesList,seriesList,animesList} = useContext(AppContext) as AppContextType;

    const [swiperList,setSwiperList] = useState <CardType[] | null>(null)

    const [filter,setFilter] = useState("")

    // const [recomendations,setRecomendations] = useState([] as CardType [])

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

    useEffect(()=>{
        let card : CardType;
        let recomentionCards : CardType []
        if(id){
            switch (typeSwiper) {
                case TypeContent.Filme : 
                    card = moviesList.filter((card)=> card.id == Number(id))[0]
                    console.log(card)
                    recomentionCards = moviesList.filter((e)=>{
                        let aux2 = false
                         e.genres?.forEach((g)=>{
                             card.genres?.forEach((genre)=>{
                                if(g.id == genre.id && card.id != e.id)
                                    aux2 = true
                            })
                        })
                        return aux2
                    })
                    break;
                    case TypeContent.Série : 
                    card = seriesList.filter((card)=> card.id == Number(id))[0]
                    recomentionCards = seriesList.filter((e)=>{
                        let aux2 = false
                         e.genres?.forEach((g)=>{
                             card.genres?.forEach((genre)=>{
                                if(g.id == genre.id && card.id != e.id)
                                    aux2 = true
                            })
                        })
                        return aux2
                    })
                    break;
                    default : 
                    card = animesList.filter((card)=> card.id == Number(id))[0]
                    recomentionCards = animesList.filter((e)=>{
                        let aux2 = false
                         e.genres?.forEach((g)=>{
                             card.genres?.forEach((genre)=>{
                                if(g.id == genre.id && card.id != e.id)
                                    aux2 = true
                            })
                        })
                        return aux2
                    })
                    break;
                }
            const randomNumber  = Math.floor(Math.random() * (recomentionCards.length / 10 ) * 9)
            recomentionCards = recomentionCards.slice(randomNumber,randomNumber + 10)
            setSwiperList(recomentionCards)
        }
    },[id,moviesList,seriesList,animesList])

    const filterSwiper = (option : string)=>{

        const list = swiperList

        switch (option) {
            case "Lançamentos" :
                list?.sort((a,b)=> {
                    if(a.release_date < b.release_date || a.first_air_date < b.first_air_date || a.first_air_date < b.release_date || a.release_date < b.first_air_date) 
                        return(1) 
                        else return(-1)
                })
            break
            case "Novos Filmes":
                list?.sort((a,b)=> {
                    if(a.watchedToday < b.watchedToday) 
                        return(1) 
                        else return(-1)
                })
            break
            case "Populares":
                list?.sort((a,b)=> {
                    if(a.vote_average < b.vote_average) 
                        return(1) 
                        else return(-1)
                })
            break
        }
        setFilter(option)
        setSwiperList(list)
    }

    // console.log(`TO aqui ; Id : ${id}`)

    // window.addEventListener('resize',()=>{
    //     const windowSize = window.innerWidth;
    //     const swiper = document.querySelector(".mySwiper")
    //     if(windowSize < 960) 
            
    //         console.log(swiper?.getAttributeNames())
    // })


    if(swiperList?.length == 0 ){
        return (
            <>
                <Loading></Loading>
            </>
        )
    } else{
            return(
                <>
                    <section className="SwiperList my-2">
                        <div className="menuSwiper flex-center ">
                            <h3 className="title mr-3">{ id ? "Recomendações" : typeSwiper}</h3>
                            <div className="SwiperList-buttonContainer flex-center">
                                { !id  ?
                                    <>
                                        <button className="starButton backgroundStar p3 mr-2 my-1" onClick={(e)=>{filterSwiper(e.currentTarget.innerHTML)}}>Lançamentos</button>
                                        <button className="sumButton p3 mr-2 my-1" onClick={(e)=>{filterSwiper(e.currentTarget.innerHTML)}}>Novos Filmes</button>
                                        <button className="popularButton p3" onClick={(e)=>{filterSwiper(e.currentTarget.innerHTML)}}>Populares</button>
                                    </>
                                    :
                                    <></>
                                }
                            </div>
                            
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
                            {window.innerWidth > 960 ? <SwiperSlide style={{width : "80px"}}></SwiperSlide> : <SwiperSlide style={{width : "15px"}}></SwiperSlide>}
                            {
                                swiperList && filter == "" ? swiperList.sort((a,b)=>{
                                    if(a.release_date < b.release_date || a.first_air_date < b.first_air_date || a.first_air_date < b.release_date || a.release_date < b.first_air_date)
                                        return(1)
                                        else return (-1)
                                }).map((movie,index)=>{
                                    if(index < 15)
                                    return (
                                        <>
                                            <SwiperSlide><Link to={`../${typeSwiper}/${movie.id}`}><Card card = {movie} key={movie.id} ></Card></Link></SwiperSlide>
                                        </>
                                    )
                                })
                                :
                                swiperList && swiperList.map((movie,index)=>{
                                    if(index < 2)
                                    return (
                                        <>
                                            <SwiperSlide><Link to={`../${typeSwiper}/${movie.id}`}><Card card = {movie} key={movie.id} ></Card></Link></SwiperSlide>
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
    // else return (
    //     <>
    //         {/* <section className="SwiperList ">
    //                     <div className="menuSwiper flex-center my-1">
    //                         <h3 className="title mr-3">Recomendações</h3>
    //                     </div>
    //                     <Swiper
    //                         slidesPerView={"auto"}
    //                         centeredSlides={false}
    //                         spaceBetween={24}
    //                         navigation={true}
    //                         grabCursor={true}
    //                         pagination={{
    //                             clickable: true,
    //                         }}
    //                         modules={[Navigation]}
    //                         className="mySwiper"
    //                     >  
    //                         <SwiperSlide style={{width : "100px"}}></SwiperSlide>
    //                         {
    //                             swiperList && filter == "" && swiperList.filter((card)=>{

    //                             }).map((movie,index)=>{
    //                                 if(index > 2 && index < 15)
    //                                 return (
    //                                     <>
    //                                         <SwiperSlide><Link to={`../${typeSwiper}/${movie.id}`}><Card card = {movie} key={movie.id} ></Card></Link></SwiperSlide>
    //                                     </>
    //                                 )
    //                             })
    //                         }
    //                     </Swiper>
    //                 </section> */}
    //     </>
    // )
            
}