import { TypeContent } from "../../Types"
import SwiperList from "../../components/SwiperList"
import SwiperMain from "../../components/SwiperMain"



export const HomePage = ()=>{
    return(
        <>
            <SwiperMain header = {true} typeSwiper= {TypeContent.Filmes}></SwiperMain>
            <SwiperList typeSwiper={TypeContent.Filmes}></SwiperList>
            <SwiperMain header = {false} typeSwiper={TypeContent.Series}></SwiperMain>
            <SwiperList typeSwiper={TypeContent.Series}></SwiperList>
            <SwiperMain header = {false} typeSwiper={TypeContent.Animes}></SwiperMain>
            <SwiperList typeSwiper={TypeContent.Animes}></SwiperList>
        </>
    )
}