
import { CardType, TypeContent } from "../../Types";
import { filterSelectUtil } from "../filterUtil";

export const handleFieldsChangeUtil = (e : {currentTarget : {value : string}}, setSearch : (value: React.SetStateAction<string>) => void)=>{
    setSearch(e.currentTarget.value)
}

export const changeLabelUtil = (parentNode : string, search : string)=>{
    const label = document.querySelector(`.${parentNode} #searchLabel`) ;

        if(search != "" && label)
            label.innerHTML = ""
        else if(label) {
            // console.log("mudei")
            label.innerHTML = "Digite o Título do Filmes, Serie..."
        }  
}

export const SearchCardsUtil = async (e : {currentTarget : {value : string}}, setCards: (value: React.SetStateAction<CardType[]>) => void, setSearch: (value: React.SetStateAction<string>) => void,typeContent: string, moviesList: CardType[], seriesList: CardType[], animesList: CardType[])=>{
    // console.log(search.length,e.keyCode)
    // console.log("To aqui ")
    // alert("to aqui")
    console.log(e.currentTarget.value)
    // console.log(cards)
    // console.log(search)


    if(e.currentTarget.value.length == 0){  
            if(typeContent != "Search"){
                filterSelectUtil(typeContent, moviesList, seriesList, animesList, setSearch, setCards)
            }else{
                setSearch("")
                setCards([...moviesList,...seriesList,...animesList])
                const label = document.querySelector("#searchLabel")
                if(label != null) label.innerHTML = "Digite o Título do Filmes, Serie..."  
            }
    } else
    if(e.currentTarget.value){
        let cardContainer = [] as CardType [] | undefined;
        let result = [] as CardType [];
        // let auxResult = [] as CardType [] | undefined;
        const aux = e.currentTarget.value.split(" ");
        aux.forEach((text)=>{ 
            switch (typeContent) {
                case TypeContent.Filme : 
                cardContainer = [...moviesList]
                    break;
                case TypeContent.Série : 
                cardContainer = [...seriesList]
                    break;
                case TypeContent.Anime : 
                cardContainer = [...animesList]
                    break;
                default : 
                    cardContainer = [...moviesList,...seriesList,...animesList]
            }
            
                result = [...result,...cardContainer.filter((card) => {
                let found = false
                    if(card.name){
                        card.name.split(/[ /;,:]/).forEach((e)=>{
                            if(e.length > 2 && e.toUpperCase() == text.toUpperCase())
                                found = true;
                        })
                    }else if(card.title){
                        card.title.split(/[ /;,:]/).forEach((e)=>{
                            if(e.length > 2 && e.toUpperCase() == text.toUpperCase())
                                found = true;
                        })
                    }
                    return found
            })]
            // if(auxResult){
            //     result = [...result,...auxResult]
            // }
        })
        // console.log(result)
        result && setCards(result)

    }
}