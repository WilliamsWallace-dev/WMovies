
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

export const SearchCardsUtil = async (e: { keyCode: number,key : string}, setCards: (value: React.SetStateAction<CardType[]>) => void, search : string, setSearch: (value: React.SetStateAction<string>) => void,typeContent: string, moviesList: CardType[], seriesList: CardType[], animesList: CardType[])=>{
    // console.log(search.length,e.keyCode)
    // console.log("To aqui ")
    console.log(e.key)
    // console.log(cards)
    // console.log(search)


    if(search.length == 1 && e.keyCode == 8){  
            if(typeContent != "Search"){
                filterSelectUtil(typeContent, moviesList, seriesList, animesList, setSearch, setCards)
            }else{
                setSearch("")
                setCards([...moviesList,...seriesList,...animesList])
                const label = document.querySelector("#searchLabel")
                if(label != null) label.innerHTML = "Digite o Título do Filmes, Serie..."  
            }
    } else
    if(e.keyCode == 13 && e.key == "Enter"){
        let result = [] as CardType [] | undefined;
        // let auxResult = [] as CardType [] | undefined;
        const aux = search.split(" ");
        aux.forEach((text)=>{ 
            switch (typeContent) {
                case TypeContent.Filme : 
                result = [...moviesList]
                    break;
                case TypeContent.Série : 
                result = [...seriesList]
                    break;
                case TypeContent.Anime : 
                result = [...animesList]
                    break;
                default : 
                    result = [...moviesList,...seriesList,...animesList]
            }
            
                result = result.filter((card) => {
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