import { TypeContent } from "../../Types"
import SwiperList from "../../components/SwiperList"
import SwiperMain from "../../components/SwiperMain"



export const HomePage = ()=>{
    return(
        <>
            <SwiperMain header = {true} typeContent= {TypeContent.Filme} typeSwiper = {"CardMain"}></SwiperMain>
            <SwiperList typeSwiper={TypeContent.Filme}></SwiperList>
            <SwiperMain header = {false} typeContent={TypeContent.Série} typeSwiper = {"CardMain"}></SwiperMain>
            <SwiperList typeSwiper={TypeContent.Série}></SwiperList>
            <SwiperMain header = {false} typeContent={TypeContent.Anime} typeSwiper = {"CardMain"}></SwiperMain>
            <SwiperList typeSwiper={TypeContent.Anime}></SwiperList>
        </>
    )
}