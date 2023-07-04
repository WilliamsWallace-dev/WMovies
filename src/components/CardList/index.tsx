import { Link } from "react-router-dom"
import { CardType } from "../../Types"
import Card from "../Card"
import { useContext, useState } from "react"
import { AppContext } from "../../context/AppContext"
import { PaginationComponent } from "../PaginationComponent"




export const CardList = ({listCards} : {listCards : CardType[]})=>{

    const itensPerPage = 15;
    const [currentPage,setCurrentPage] = useState(0)    

    const pages = listCards ? Math.ceil(listCards.length / itensPerPage) : 0
    const startIndex = currentPage * itensPerPage
    const endIndex = startIndex + itensPerPage
    const currentItens =  listCards ? listCards.slice(startIndex,endIndex) : [] as  CardType []

    return(
        <>
        <div className="featuresProfile flex-center flex-column ">
            <section className="cardContainer flex-center flex-wrap p-1 mt-3">
                                    {
                                        listCards ? listCards.map((card)=>{
                                            return(
                                                <>
                                                    <div className="m-2">
                                                        <Link to={`../${card.typeContent}/${card.id}` }><Card card = {card} key = {card.id}></Card></Link>
                                                    </div>
                                                    
                                                </>
                                            )
                                        }) : <></>
                                        
                                    }
            </section>
            <PaginationComponent pages = {pages} setCurrentPage={setCurrentPage} currentPage = {currentPage}></PaginationComponent>
        </div>
            
        </>
    )
}