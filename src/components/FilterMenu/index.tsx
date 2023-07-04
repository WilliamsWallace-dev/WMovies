import { CardType, Genre } from "../../Types"
import { SearchCardsUtil, changeLabelUtil, handleFieldsChangeUtil } from "../../utils/searchUtil"
import {ReverCardsUtil, filterSelectUtil} from "../../utils/filterUtil"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../context/AppContext"

const handleFieldsChange = (e : {currentTarget : {value : string}}, setSearch : (value: React.SetStateAction<string>) => void)=>{
    setSearch(e.currentTarget.value)
}

const changeLabel = (parentNode : string, search : string)=>{
    changeLabelUtil(parentNode, search)
}

const SearchCards = async (e: { keyCode: number; } , cards : CardType[], setCards: (value: React.SetStateAction<CardType[]>) => void, search : string, setSearch: (value: React.SetStateAction<string>) => void, typeContent: string, moviesList: CardType[], seriesList: CardType[], animesList: CardType[],  setSort: (value: React.SetStateAction<string>) => void)=>{
    SearchCardsUtil(e,cards,setCards,search,setSearch,typeContent, moviesList, seriesList, animesList,  setSort)
}



export const FilterMenu = ({parentNode,cards,setCards, search, setSearch,typeContent} : {parentNode : string, cards : CardType[], setCards: (value: React.SetStateAction<CardType[]>) => void, search : string, setSearch: (value: React.SetStateAction<string>) => void , typeContent : string})=>{

    const [sort,setSort] = useState("")

    const {moviesList,seriesList,animesList} = useContext(AppContext)

    useEffect(()=>{
        typeContent != "Search" && filterSelectUtil("Ano",typeContent, moviesList, seriesList, animesList,  setSort, setSearch, setCards,cards)
    },[moviesList,seriesList,animesList,typeContent])
    
    if(typeContent != "Search")
        return(
            <>             
                <section className="filterMenu container flex-space-around w-100" >
                            <h3 className="title mr-3">{typeContent}</h3>
                            <div className="inputSearch">
                                <input className="inputSearchTarget" type="text" id="search" value={search} onChange={(e)=>{handleFieldsChange(e,setSearch)}}  onBlur={()=>{changeLabel(parentNode,search)}} onKeyDown={(e)=>{SearchCards(e,cards,setCards,search,setSearch,typeContent, moviesList, seriesList, animesList,  setSort)}} placeholder=""/>
                                <label id="searchLabel" htmlFor="search">Digite o Título do Filmes, Serie...</label>
                            </div>  
                            <div className="selectFilter-menu">
                                <label htmlFor="Categoria" className="p2 mr-1">Ordenar por</label>

                                <select name="Sort" id="Sort" className="sortSelect mr-3 p2" onChange={(e)=> filterSelectUtil(e.target.value,typeContent, moviesList, seriesList, animesList,  setSort, setSearch, setCards,cards)}>
                                    <option value="Ano">Ano</option>
                                    <option value="Título">Título</option>
                                    <option value="Rating">Rating</option>
                                </select>

                                <label htmlFor="Gênero" className="p2 mr-1">Gênero</label>

                                <select name="Gênero" id="Gênero" className="genreSelect p2 mr-3" onChange={(e)=> filterSelectUtil(e.target.value,typeContent, moviesList, seriesList, animesList,  setSort, setSearch, setCards,cards)}>
                                    <option value="Todos">Todos</option>
                                    {Genre.All.map((e)=>{
                                        return (
                                            <>
                                                <option value={e.id}>{e.name}</option>
                                            </>
                                        )
                                    })}
                                </select>
                                <button className="buttonIcon buttonIconReverse" onClick={(e)=>{ReverCardsUtil(e,cards,setCards,setSort)}}></button>
                            </div>
                        </section>    
                        
            </>      
        )
    else return(
        <>
            <section className="filterMenu Search container" >
                            {/* <h3 className="title mr-5">Pesquisa</h3> */}
                            <div className="inputSearch">
                                <input className="inputSearchTarget" type="text" id="search" value={search} onChange={(e)=>{handleFieldsChange(e,setSearch)}}  onBlur={()=>{changeLabel(parentNode,search)}} onKeyDown={(e)=>{SearchCards(e,cards,setCards,search,setSearch,typeContent, moviesList, seriesList, animesList,  setSort)}} placeholder=""/>
                                <label id="searchLabel" htmlFor="search">Digite o Título do Filmes, Serie...</label>
                            </div>  
            </section>    
        </>
    )
        
}