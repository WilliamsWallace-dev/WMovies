import { useNavigate, useParams } from "react-router-dom"
import CardDescription from "../../components/CardDescription"
import Header from "../../components/Header"
import SwiperMain from "../../components/SwiperMain"
import { CardType, Genre, TypeContent } from "../../Types"
import { useState, useContext, useEffect } from "react"
import { AppContext } from "../../context/AppContext"
import Card from "../Card"
import { PaginationComponent } from "../PaginationComponent"



export const CardBoard = ({typeContent} : {typeContent : string})=>{
    
    const [cards,setCards] = useState([] as CardType [])

    const {moviesList,seriesList,animesList} = useContext(AppContext)

    const [search,setSearch] = useState("") ;

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
    })




    //////////////////


    const handleFieldsChange = (e : {currentTarget : {value : string}})=>{
        setSearch(e.currentTarget.value)
    }

    const changeLabel = ()=>{
        const label = document.querySelector("#searchLabel") ;

            if(search != "" && label)
                label.innerHTML = ""
            else if(label) {
                console.log("mudei")
                label.innerHTML = "Digite o Título do Filmes, Serie..."
            }  
    }
    
    const SearchCards = async (e: { keyCode: number; })=>{
        console.log(search.length,e.keyCode)
        if(search.length == 0 && e.keyCode == 8){
            filterSelect()
        } else
        if(e.keyCode == 13){
            let result = [] as CardType [] | undefined;
            // let auxResult = [] as CardType [] | undefined;
            const aux = search.split(" ");
            aux.forEach((text)=>{ 
                result = cards.filter((card) => {
                    let found = false
                        if(card.name){
                            card.name.split(" ").forEach((e)=>{
                                if(e.length > 2 && e.toUpperCase() == text.toUpperCase())
                                    found = true;
                            })
                        }else if(card.title){
                            card.title.split(" ").forEach((e)=>{
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
            console.log(result)
            result && setCards(result)

        }
    }

    const itensPerPage = 15;
    const [currentPage,setCurrentPage] = useState(0)    

    const pages = cards ? Math.ceil(cards.length / itensPerPage) : 0
    const startIndex = currentPage * itensPerPage
    const endIndex = startIndex + itensPerPage
    const currentItens =  cards ? cards.slice(startIndex,endIndex) : [] as  CardType []


    // const navigate = useNavigate();

    // console.log(user.favorites)
    // console.log(moviesList)

    useEffect(()=>{
        window.scrollTo(0,0);
    },[currentPage])

    // console.log(feature.typeContent, feature.typeOp)

    console.log(cards)

    const filterSelect = ()=>{

        console.log("filter")

        // let listCard : CardType [] | undefined;

        // setSearch("")
        // const label = document.querySelector("#searchLabel")
        // if(label != null) label.innerHTML = "Digite o Título do Filmes, Serie..."

        // const filter = ["Todos","Todos"]
        // document.querySelectorAll("select").forEach((element, index) =>{
        //     filter[index] = element.value            
        // })

        // if(filter[0] == "Todos"){
        //     listCard = user[cards.contentType]
        // }else {
        //     listCard = user[cards.contentType]?.filter((card)=>{return card.typeContent == filter[0]})
        // }

        // let aux : CardType[] | undefined
        // if(filter[1] != "Todos"){
        //     console.log(filter[1])
        //     aux = listCard?.filter((card)=>{
        //         let found = false
        //         card.genres?.forEach((e)=>{
        //             if(e.id == Number(filter[1])){
        //                 found = true
        //             }    
        //         })
        //         return found;
        //     })
        //     listCard = aux
        // }

        // setCards({...cards, listCard :listCard})
    }





    ////////////////////////



    return(
        <>
            <section className="CardBoard container flex-column">
                
                <div className="filterMenu flex-center flex-space-around w-100" >
                    <h3 className="title mr-3">{typeContent}</h3>
                            {/* <div>
                                <button className="second-button favoriteActive mr-2" onClick={(e)=>{favoritesActive(e)}}>Favoritos</button>
                                <button className="second-button seeLater" onClick={(e)=>{seeLaterActive(e)}}>Ver Depois</button>
                            </div> */}
                            <div className="inputSearch">
                                    <input className="" type="text" id="search" value={search} onChange={handleFieldsChange}  onBlur={changeLabel} onKeyDown={SearchCards} placeholder=""/>
                                    <label id="searchLabel" htmlFor="search">Digite o Título do Filmes, Serie...</label>
                            </div> 
                            <div className="selectFilter-menu">
                                <label htmlFor="Categoria" className="p2 mr-1">Categoria</label>

                                <select name="Categoria" id="Categoria" className="categorySelect mr-3 p2" onChange={()=> filterSelect()}>
                                    <option value="Todos">Todos</option>
                                    <option value="Filme">Filme</option>
                                    <option value="Série">Série</option>
                                    <option value="Anime">Anime</option>
                                </select>

                                <label htmlFor="Gênero" className="p2 mr-1">Gênero</label>

                                <select name="Gênero" id="Gênero" className="genreSelect p2" onChange={()=> filterSelect()}>
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
                </div>
                <div className="featuresProfile flex-center flex-column ">
                            <section className="cardContainer flex-center flex-wrap py-4 mt-3">
                                {
                                    currentItens ? currentItens.map((card)=>{
                                        return(
                                            <>
                                                <div className="m-2">
                                                    <Card card = {card} key = {card.id}></Card>
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