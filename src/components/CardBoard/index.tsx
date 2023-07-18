import { Link } from "react-router-dom"
import { CardType, Genre, TypeContent } from "../../Types"
import { useState, useContext, useEffect, MouseEvent } from "react"
import { AppContext } from "../../context/AppContext"
import Card from "../Card"
import { PaginationComponent } from "../PaginationComponent"



export const CardBoard = ({typeContent} : {typeContent : string})=>{
    
    const [cards,setCards] = useState([] as CardType [])

    const [sort,setSort] = useState("")

    const {moviesList,seriesList,animesList} = useContext(AppContext)

    const [search,setSearch] = useState("") ;

    // console.log(document.querySelector(".CardBoard .inputSearchTarget").value)

    useEffect(()=>{
        switch (typeContent) {
            case TypeContent.Filme : 
                setCards(moviesList)
                break;
            case TypeContent.Série : 
                setCards(seriesList)
                break;
            case TypeContent.Anime : 
                setCards(animesList)
                break;
        }
        sort && setSearch("")
        const label = document.querySelector("#searchLabel")
        if(label != null) label.innerHTML = "Digite o Título do Filmes, Serie..."

        document.querySelectorAll("select").forEach((element, index) =>{
            if(index == 0) element.value = "Ano" 
            else element.value = "Todos"  
        })
        filterSelect("Ano")

    },[moviesList,seriesList,animesList,typeContent])




    //////////////////


    const handleFieldsChange = (e : {currentTarget : {value : string}})=>{
        setSearch(e.currentTarget.value)
    }

    const changeLabel = ()=>{
        const label = document.querySelector("#searchLabel") ;

            if(search != "" && label)
                label.innerHTML = ""
            else if(label) {
                // console.log("mudei")
                label.innerHTML = "Digite o Título do Filmes, Serie..."
            }  
    }
    
    const SearchCards = async (e: { keyCode: number; })=>{
        // console.log(search.length,e.keyCode)
        if(search.length == 1 && e.keyCode == 8){
            filterSelect("reset")
        } else
        if(e.keyCode == 13){
            let result = [] as CardType [] | undefined;
            // let auxResult = [] as CardType [] | undefined;
            const aux = search.split(" ");
            aux.forEach((text)=>{ 
                result = cards.filter((card) => {
                    let found = false
                        if(card.name){
                            card.name.split(/[ -/;,:]/).forEach((e)=>{
                                if(e.length > 2 && e.toUpperCase() == text.toUpperCase())
                                    found = true;
                            })
                        }else if(card.title){
                            card.title.split(/[ -/;,:]/).forEach((e)=>{
                                if(e.length > 2 && e.toUpperCase() == text.toUpperCase())
                                    found = true;
                            })
                        }
                        return found
                })
                // if(auxResult){
                //     result = [...result,...auxResult]
                // }
            })
            // console.log(result)
            result && setCards(result)
        }
    }

    const itensPerPage = 15;
    const [currentPage,setCurrentPage] = useState(0)    

    const pages = cards ? Math.ceil(cards.length / itensPerPage) : 0
    const startIndex = currentPage * itensPerPage
    const endIndex = startIndex + itensPerPage
    const currentItens =  cards ? cards.slice(startIndex,endIndex) : [] as  CardType []


    const filterSelect = (sort : string)=>{

        let listCard : CardType[];

        switch (typeContent) {
            case TypeContent.Filme : 
                listCard = moviesList
                break;
            case TypeContent.Série : 
                listCard = seriesList
                break;
            default :
                listCard = animesList
                break;
        }

        setSearch("")
        const label = document.querySelector("#searchLabel")
        if(label != null) label.innerHTML = "Digite o Título do Filmes, Serie..."

        const filter = ["Todos","Todos"]
        document.querySelectorAll("select").forEach((element, index) =>{
            filter[index] = element.value            
        })
            switch (filter[0]){
    
                case "Ano" : 
                    listCard.sort((a,b)=>{
                        if(a.typeContent == "Filme"){
                            return a.release_date < b.release_date ?  1 : -1
                        }else return a.first_air_date < b.first_air_date ?  1 : -1
                    })
                    break;
                case "Título" : 
                    listCard.sort((a,b)=>{
                        if(a.typeContent == "Filme"){
                            return a.title > b.title ?  1 : -1
                        }else return a.name > b.name ?  1 : -1
                    })
                    break;
                case "Rating" : 
                    listCard.sort((a,b)=>{
                            return a.vote_average < b.vote_average ?  1 : -1
                    })
                    break;
            }

        

        let aux : CardType[] | undefined

        if(filter[1] != "Todos"){
            console.log(listCard)
            aux = listCard?.filter((card)=>{
                let found = false
                card.genres?.forEach((e)=>{
                    if(e.id == Number(filter[1])){
                        found = true
                    }    
                })
                return found;
            })
            listCard = aux
        }
        setCards(listCard)
        setSort(sort)
    }

    const ReverCards = (e: MouseEvent<HTMLButtonElement>)=>{
        setCards(cards.reverse())
        setSort(String(e.currentTarget.classList.toggle("rotateIcon")))
    }





    ////////////////////////



    return(
        <>
            <section className="CardBoard container flex-column">
                <div className="popCorn-left "></div>
                <div className="popCorn-right "></div>
                <div className="filterMenu flex-center flex-wrap w-100" >
                            <h3 className="title mr-4">{typeContent}</h3>
                            {/* <div>
                                <button className="second-button favoriteActive mr-2" onClick={(e)=>{favoritesActive(e)}}>Favoritos</button>
                                <button className="second-button seeLater" onClick={(e)=>{seeLaterActive(e)}}>Ver Depois</button>
                            </div> */}
                            <div className="flex-center flex-wrap">
                                <div className="inputSearch">
                                        <input className="inputSearchTarget" type="text" id="search" value={search} onChange={handleFieldsChange}  onBlur={changeLabel} onKeyDown={SearchCards} placeholder=""/>
                                        <label id="searchLabel" htmlFor="search">Digite o Título do Filmes, Serie...</label>
                                </div> 
                                <div className="selectFilter-menu flex-center flex-wrap">
                                    <div>
                                        <label htmlFor="Categoria" className="p2 mr-1">Ordenar por</label>

                                        <select name="Sort" id="Sort" className="sortSelect mr-3 p2" onChange={(e)=> filterSelect(e.target.value)}>
                                            <option value="Ano">Ano</option>
                                            <option value="Título">Título</option>
                                            <option value="Rating">Rating</option>
                                        </select>
                                    </div>
                                    
                                    <div>
                                        <label htmlFor="Gênero" className="p2 mr-1">Gênero</label>

                                        <select name="Gênero" id="Gênero" className="genreSelect p2 mr-3" onChange={(e)=> filterSelect(e.target.value)}>
                                            <option value="Todos">Todos</option>
                                            {Genre.All.map((e)=>{
                                                return (
                                                    <>
                                                        <option value={e.id}>{e.name}</option>
                                                    </>
                                                )
                                            })}
                                        </select>
                                    </div>
                                    
                                    <button className="buttonIcon buttonIconReverse" onClick={(e)=>{ReverCards(e)}}></button>
                            </div>
                            
                            </div>
                </div>
                <div className="featuresProfile flex-center flex-column ">
                            <section className="cardContainer flex-center flex-wrap py-4 mt-3">
                                {
                                    currentItens ? currentItens.map((card)=>{
                                        return(
                                            <>
                                                <div className="m-2">
                                                    <Link to={`../${typeContent}/descrição/${card.id}` }><Card card = {card} key = {card.id}></Card></Link>
                                                </div>
                                                
                                            </>
                                        )
                                    }) : <></>
                                    
                                }
                            </section>
                            <PaginationComponent pages = {pages} setCurrentPage={setCurrentPage} currentPage = {currentPage}></PaginationComponent>
                            
                </div>
        </section>
        </>
    )
}