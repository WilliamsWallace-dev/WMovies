import { CardType } from "../../Types";
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

export const SearchCardsUtil = async (e: { keyCode: number; } , cards : CardType[], setCards: (value: React.SetStateAction<CardType[]>) => void, search : string, setSearch: (value: React.SetStateAction<string>) => void,typeContent: string, moviesList: CardType[], seriesList: CardType[], animesList: CardType[],  setSort: (value: React.SetStateAction<string>) => void)=>{
    // console.log(search.length,e.keyCode)
    if(search.length == 1 && e.keyCode == 8){  
            if(typeContent != "Search"){
                filterSelectUtil("reset",typeContent, moviesList, seriesList, animesList,setSort, setSearch, setCards,cards)
            }else{
                setSearch("")
                setCards([...moviesList,...seriesList,...animesList])
                const label = document.querySelector("#searchLabel")
                if(label != null) label.innerHTML = "Digite o Título do Filmes, Serie..."  
            }
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