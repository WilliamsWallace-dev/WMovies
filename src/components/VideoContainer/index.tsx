import { closeVideoUtil } from "../../utils/videoUtil"



export const VideoContainer = ()=>{
    return(
        <>
            <section className="videoContainer videoContainerDisable">
                    <div className="iframeContainer relative">
                        <iframe width="1280" height="720" src="" title="" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                        <button className="closeButton" onClick={closeVideoUtil}>X</button>
                    </div>
            </section>
        </>
    )
}