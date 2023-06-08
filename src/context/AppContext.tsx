import { ReactNode, createContext, useEffect, useState } from "react"; 

import { tmdb,URLValues,getTmdb } from "../services/Api";
import { AppContextType, SearchTMDBType } from "../Types";

export const AppContext = createContext <AppContextType>({} as AppContextType);

export const AppProvidor = ({children} : {children : ReactNode}) =>{
    const [moviesList,setMoviesList] = useState <SearchTMDBType | null>(null);
    const [seriesList,setSeriesList] = useState <SearchTMDBType | null>(null);
    const [animesList,setAnimesList] = useState <SearchTMDBType | null>(null);

    

    useEffect(()=>{
        GetMoviesList();
        GetSeriesList()
        GetAnimesList()
    },[])

    const GetMoviesList = async ()=>{
        const url = `${URLValues.movies}${URLValues.nowPlaying}${URLValues.api_key}&page=${1}`
        setMoviesList(await getTmdb(url));
    }
    const GetSeriesList = async ()=>{
        const url = `${URLValues.movies}${URLValues.nowPlaying}${URLValues.api_key}&page=${2}`
        setSeriesList(await getTmdb(url));
    }
    const GetAnimesList = async ()=>{
        const url = `${URLValues.movies}${URLValues.nowPlaying}${URLValues.api_key}&page=${3}`
        setAnimesList(await getTmdb(url));
    }

    return (
        <>
            <AppContext.Provider value = {{
                moviesList,GetMoviesList,
                seriesList,GetSeriesList,
                animesList,GetAnimesList

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