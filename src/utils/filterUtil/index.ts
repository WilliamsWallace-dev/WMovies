import { MouseEvent } from "react";
import { CardType, TypeContent } from "../../Types";

export const filterSelectUtil = (sort : string, typeContent : string,moviesList : CardType[],seriesList : CardType[],animesList : CardType[],  setSort: (value: React.SetStateAction<string>) => void ,setSearch : (value: React.SetStateAction<string>) => void,setCards: (value: React.SetStateAction<CardType[]>) => void,cards : CardType[] )=>{

    let listCard : CardType[] = [] as CardType[];

    switch (typeContent) {
        case TypeContent.Filme : 
            listCard = moviesList
            break;
        case TypeContent.Série : 
            listCard = seriesList
            break;
        case TypeContent.Anime :
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


export const ReverCardsUtil = (e: MouseEvent<HTMLButtonElement>,cards : CardType[],setCards: (value: React.SetStateAction<CardType[]>) => void,setSort: (value: React.SetStateAction<string>) => void)=>{
    setCards(...[cards.reverse()])
    setSort(String(e.currentTarget.classList.toggle("rotateIcon")))
}