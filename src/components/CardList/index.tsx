import { Link } from "react-router-dom"
import { CardType } from "../../Types"
import Card from "../Card"
import {useState } from "react"
import { PaginationComponent } from "../PaginationComponent"




export const CardList = ({listCards} : {listCards : CardType[]})=>{
    // console.log("to aqui")
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
                                        currentItens ? currentItens.map((card)=>{
                                            return(
                                                <>
                                                    <div className="m-2">
                                                        <Link to={`../${card.typeContent}/descrição/${card.id}` }><Card card = {card} key = {card.id}></Card></Link>
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