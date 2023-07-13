import { useParams } from "react-router-dom"
import SwiperMain from "../../components/SwiperMain"
import { CardBoard } from "../../components/CardBoard"



export const CardBoardPage = ()=>{

    const {typeContent} = useParams()

    return(
        <>
            { typeContent && <SwiperMain header = {true} typeContent = {typeContent} typeSwiper = {"CardDescription"}></SwiperMain> }
            { typeContent && <CardBoard typeContent={typeContent}></CardBoard> }
        </>
    )
}