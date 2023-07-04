import { useContext, useEffect, useState } from "react"
import { CardList } from "../../components/CardList"
import { AppContext } from "../../context/AppContext"
import { CardType } from "../../Types"
import { FilterMenu } from "../../components/FilterMenu"
import SearchPageImage from "../../assets/background/SearchPageImage.png"


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

    return(
        <>
            <section className="SearchPage">
                <FilterMenu parentNode= {"SearchPage"} cards = {cards} setCards = {setCards} search = {search} setSearch = {setSearch} typeContent = {`Search`}></FilterMenu>
                {
                    cards.length == [...moviesList,...animesList,...seriesList].length ? 
                        <>
                            <div className="flex-center flex-column">
                                <div><img src={SearchPageImage} alt="Imagem de Picoca" /></div>
                            </div>
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