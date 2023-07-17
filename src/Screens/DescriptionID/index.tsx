import { useParams } from "react-router-dom"
import CardDescription from "../../components/CardDescription"
import SwiperList from "../../components/SwiperList"
import { ScrollToTop } from "../../components/ScrollToTop";
import { closeVideoUtil } from "../../utils/videoUtil";
import { VideoContainer } from "../../components/VideoContainer";


export const DescriptionID = ()=>{

    const {typeContent = "" , id = "0"} = useParams();

    return(
        <>
            <ScrollToTop></ScrollToTop>
            <section className="DescriptionIDContainer">
                <CardDescription key={Number(id)}></CardDescription>
            </section>    
            {/* <section className="videoContainer videoContainerDisable">
                    <div className="iframeContainer relative">
                        <iframe width="1280" height="720" src="" title="" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                        <button className="closeButton" onClick={closeVideoUtil}>X</button>
                    </div>
            </section> */}
            <VideoContainer></VideoContainer>
            <SwiperList typeSwiper={typeContent} id = {id}></SwiperList>
        </>
    )
}