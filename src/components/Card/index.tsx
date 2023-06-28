import { CardType } from "../../Types"
import "../../style/style.css"

import { URLValues } from "../../services/Api"
import { useParams } from "react-router-dom"

export default function Card({card ,key} : {card : CardType , key : number}){
    
    return(
        <>
            <section className="SwiperListItem flex-center flex-column">
                        <div className="sinopseHover px-1">
                            <p className="p5" style={{opacity : ".64"}} >Sinopse</p>
                                <p>
                                    {`${card.overview.match(/^[^.]+/)} . . .`}
                                </p>
                                <button className="second-button buttonIconPlayCard mt-2">ver mais</button>
                        </div>
                        <p className="titleListItem p5 px-1" style={{textAlign : "center"}}>{card.name || card.title}</p>
                        <div className="descriptionListItem flex-start mb-2">
                            {card.first_air_date || card.release_date ? <p className="p5 mr-2">{card.first_air_date ? card.first_air_date.split('-')[0] : card.release_date.split('-')[0]}</p> : <></> }
                            <p className="duration p5 mr-2 ">{card.runtime || "2h,36min"}</p>
                            <p className="rated p5">{card.vote_average}</p>
                        </div>
                        <div className="backgroundListItem"><img src= {`${URLValues.img_path}${card.poster_path}`} alt="" /></div>
            </section>
        </>
    )
}



//Descrição sem Sinopse
{/* <p className="sinopseHover px-1">
    Peter Parker é desmascarado e não consegue mais separar sua vida normal dos grandes riscos
    de ser um super-herói. Quando ele pede ajuda ao Doutor Estranho, os riscos se tornam ainda mais perigosos, e o forçam
    a descobrir o que realmente significa ser o Homem-Aranha.
</p> */}