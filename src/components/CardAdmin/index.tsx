import { CardType } from "../../Types"
import "../../style/style.css"
import { useContext} from "react";
import { URLValues } from "../../services/Api"
import { AppContext } from "../../context/AppContext"
// import { useParams } from "react-router-dom"

export function CardAdmin({card, typeOp, typeContent} : {card : CardType, typeOp : string , typeContent : "Filme" | "Série" | "Anime"}){
    const {SetLists,DelCard} = useContext(AppContext)
    // console.log(card)
    return(
        <>
            <section className="SwiperListItem CardAdmin flex-center flex-column m-2">
                        <div className="sinopseHover px-1">
                        {
                                typeOp == "Adicionar" ? <button className="buttonAdd p1" onClick={()=>{SetLists(typeContent,card)}}>+</button> : <><button className="buttonDel p1" onClick={()=>{DelCard(typeContent,card);DelCard(typeContent,card,true)}}>X</button> <div className="mt-4"><h3>Lista de Destaque</h3><div><button className="buttonAdd p1 mr-4" onClick={()=>{SetLists(typeContent,card,true)}}>+</button><button className="buttonDel p1" onClick={()=>{DelCard(typeContent,card,true)}}>x</button></div></div></>
                            }
                        </div>
                        <p className="titleListItem p5 px-1" style={{textAlign : "center"}}>{card.name || card.title}</p>
                        <div className="descriptionListItem flex-start mb-2">
                            {card.first_air_date || card.release_date ? <p className="p5 mr-2">{card.first_air_date ? card.first_air_date.split('-')[0] : card.release_date.split('-')[0]}</p> : <></> }
                            <p className="p5 mr-2 ">{`ID : ${card.id} `}</p>
                            <p className="rated p5">{card.vote_average.toFixed(1)}</p>
                        </div>
                        <div className="backgroundListItem"><img src= {`${URLValues.img_path}${card.poster_path}`} alt="" /></div>
            </section>
        </>
    )
}


