import { TypeContent } from "../../Types"
import SwiperList from "../../components/SwiperList"
import SwiperMain from "../../components/SwiperMain"



export const HomePage = ()=>{
    return(
        <>
            <SwiperMain header = {true} typeSwiper= {TypeContent.Filme}></SwiperMain>
            <SwiperList typeSwiper={TypeContent.Filme}></SwiperList>
            <SwiperMain header = {false} typeSwiper={TypeContent.Série}></SwiperMain>
            <SwiperList typeSwiper={TypeContent.Série}></SwiperList>
            <SwiperMain header = {false} typeSwiper={TypeContent.Anime}></SwiperMain>
            <SwiperList typeSwiper={TypeContent.Anime}></SwiperList>
        </>
    )
}