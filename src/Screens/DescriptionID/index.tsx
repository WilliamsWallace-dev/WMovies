import { useParams } from "react-router-dom"
import CardDescription from "../../components/CardDescription"
import SwiperList from "../../components/SwiperList"
import { ScrollToTop } from "../../components/ScrollToTop";



export const DescriptionID = ()=>{

    const {typeContent = "" , id = "0"} = useParams();

    return(
        <>
            <ScrollToTop></ScrollToTop>
            <CardDescription></CardDescription>
            <SwiperList typeSwiper={typeContent} id = {id}></SwiperList>
        </>
    )
}