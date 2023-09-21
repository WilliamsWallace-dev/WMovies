import { useContext, useEffect, useState } from "react"
import { CardList } from "../../components/CardList"
import { AppContext } from "../../context/AppContext"
import { CardType } from "../../Types"
import { FilterMenu } from "../../components/FilterMenu"
import { MovieTime } from "../../components/MovieTime"


export const SearchPage = ()=>{

    const [cards,setCards] = useState([] as CardType [])

    const {moviesList,seriesList,animesList} = useContext(AppContext)

    const [search,setSearch] = useState("") ;

    useEffect(()=>{

        setCards([...moviesList,...seriesList,...animesList])
        setSearch("")
        const label = document.querySelector("#searchLabel")
        if(label != null) label.innerHTML = "Digite o Título do Filmes, Serie..."

        document.querySelectorAll("select").forEach((element, index) =>{
            if(index == 0) element.value = "Ano" 
            else element.value = "Todos"  
        })
        

    },[moviesList,seriesList,animesList])
    // useEffect(()=>{
    //     if(cards.length < (moviesList.length + seriesList.length + animesList.length))
    //     console.log("passei aqui denovo mlk")
    // },[cards])

    return(
        <>
            <section className="SearchPage">
                <FilterMenu parentNode= {"SearchPage"} cards = {cards} setCards = {setCards} search = {search} setSearch = {setSearch} typeContent = {`Search`}></FilterMenu>
                {
                    cards.length == [...moviesList,...animesList,...seriesList].length || cards.length == 0 ? 
                        <>
                            {/* <MovieTime></MovieTime> */}
                            <div className="mb-5"> <MovieTime></MovieTime> </div>
                        </> 
                        : 
                        <>
                            <CardList listCards={cards}></CardList>
                        </>
                }                
            </section>
            
        </>
    )
}