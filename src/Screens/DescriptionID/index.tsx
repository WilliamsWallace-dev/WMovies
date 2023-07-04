import { useParams } from "react-router-dom"
import CardDescription from "../../components/CardDescription"
import SwiperList from "../../components/SwiperList"
import { ScrollToTop } from "../../components/ScrollToTop";
import { closeVideoUtil } from "../../utils/videoUtil";


export const DescriptionID = ()=>{

    const {typeContent = "" , id = "0"} = useParams();

    return(
        <>
            <ScrollToTop></ScrollToTop>
            <section className="DescriptionIDContainer">
                <CardDescription key={Number(id)}></CardDescription>
            </section>    
            <section className="videoContainer videoContainerDisable">
                    <iframe width="1280" height="720" src="" title="Touch of Heaven - David Funk | Worship Night" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                    <button className="closeVideo" onClick={closeVideoUtil}>X</button>
            </section>
            <SwiperList typeSwiper={typeContent} id = {id}></SwiperList>
        </>
    )
}