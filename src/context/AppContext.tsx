import { ReactNode, createContext, useEffect, useState } from "react"; 

import { tmdb,URLValues,getTmdb, getDocumentDbCardList, DelDocumentDb, SetDocumentDbCardType } from "../services/Api";
import { AppContextType, CardType, SearchTMDBType } from "../Types";


export const AppContext = createContext <AppContextType>({} as AppContextType);

export const AppProvidor = ({children} : {children : ReactNode}) =>{
    const [moviesList,setMoviesList] = useState <CardType []>([]);
    const [seriesList,setSeriesList] = useState <CardType []>([]);
    const [animesList,setAnimesList] = useState <CardType []>([]);

    

    useEffect(()=>{
        GetLists();
    },[])

    const GetLists = async ()=>{
        let result = await getDocumentDbCardList("Filme")
        setMoviesList(result);
         result = await getDocumentDbCardList("Série")
         setSeriesList(result);
         result = await getDocumentDbCardList("Anime")
         setAnimesList(result);
    }
    const SetLists = async (typeList : "Filme" | "Série" | "Anime", data : CardType) =>{

        await SetDocumentDbCardType(typeList,data)

        if(typeList == "Filme"){
            setMoviesList([...moviesList,data])
        }else if(typeList == "Série"){
                setSeriesList([...moviesList,data])
        }else setAnimesList([...moviesList,data])
    }
    const DelCard = async (typeList : "Filme" | "Série" | "Anime", data : CardType) =>{
        console.log("delcard")
        await DelDocumentDb(typeList, data)

        if(typeList == "Filme"){
            setMoviesList(moviesList.filter((card)=> card.id != data.id))
        }else if(typeList == "Série"){
                setSeriesList(seriesList.filter((card)=> card.id != data.id))
        }else setAnimesList(seriesList.filter((card)=> card.id != data.id ))
        
    }
    // const GetSeriesList = async ()=>{
    //     const url = `${URLValues.movies}${URLValues.nowPlaying}${URLValues.api_key}&page=${2}`
    //     setSeriesList(await getTmdb(url));
    // }
    // const GetAnimesList = async ()=>{
    //     const url = `${URLValues.movies}${URLValues.nowPlaying}${URLValues.api_key}&page=${3}`
    //     setAnimesList(await getTmdb(url));
    // }

    return (
        <>
            <AppContext.Provider value = {{
                moviesList,
                seriesList,
                animesList,
                GetLists,
                SetLists,
                DelCard
            }}>
                {children}
            </AppContext.Provider>
        </>
    )
}   
















// import React, { ReactNode, useState } from "react";

// import { createContext } from "react";

// interface ContextType {
//     theme : StateType
// }

// interface StateType { 
//     themeMood :
// }

// const AppContext = createContext <ContextType | null>(null)

// const AppProvidor = ({children} : {children : ReactNode})=>{
    
//     const [theme , setTheme] = useState <StateType>({})


//     return (
//         <>
//             <AppContext.Provider value = {{
//                 theme
//             }}>
//                 {children}
//             </AppContext.Provider>
//         </>
//     )
// }





// import { ReactNode, createContext, useState } from "react";
// import { AppContextType } from "../Types";
// import { CardType } from "../Types";

// export const AppContext = createContext <AppContextType | null>(null);


// export const AppProvidor = ({children} : {children : ReactNode}) =>{

//      const [theme,setTheme] = useState <CardType[] | null >(null)

//      const changeTheme = (theme : CardType[])=>{
//         setTheme(theme)
//      }

//      return (
//         <>
//             <AppContext.Provider value = {{
//                 theme,
//                 changeTheme
//             }}>
//                 {children}
//             </AppContext.Provider>
//         </>
//      )
// }