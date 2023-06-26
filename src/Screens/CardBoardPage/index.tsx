import { useParams } from "react-router-dom"
import CardDescription from "../../components/CardDescription"
import Header from "../../components/Header"
import SwiperMain from "../../components/SwiperMain"
import { CardType, TypeContent } from "../../Types"
import { useState, useContext, useEffect } from "react"
import { AppContext } from "../../context/AppContext"
import { CardBoard } from "../../components/CardBoard"



export const CardBoardPage = ()=>{

    const {typeContent} = useParams()

    return(
        <>
            { typeContent && <SwiperMain header = {true} typeSwiper={typeContent}></SwiperMain> }
            { typeContent && <CardBoard typeContent={typeContent}></CardBoard> }
        </>
    )
}