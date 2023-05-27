import { ReactNode, createContext, useState } from "react"; 

import { tmdb,URLValues } from "../services/Api";
import { AppContextType, SearchTMDBType } from "../Types";

export const AppContext = createContext <AppContextType | null>(null);

export const AppProvidor = ({children} : {children : ReactNode}) =>{
    const [swiperMovies,setSwiperMovies] = useState <SearchTMDBType | null> (null);
    const [swiperMainMovies,setSwiperMainMovies] = useState <SearchTMDBType | null> (null);

    const getTmdb = async (url : string)=>{
        const res = await tmdb.get(url);
        console.log(res.data)
        return res.data;
    }
    const SwiperMoviesNowPlaying = async ()=>{
        const url = `${URLValues.movies}${URLValues.nowPlaying}${URLValues.api_key}&page=${1}`
        setSwiperMovies(await getTmdb(url));
    }
    const SwiperMainMoviesNowPlaying = async ()=>{
        const url = `${URLValues.movies}${URLValues.nowPlaying}${URLValues.api_key}&page=${2}`
        setSwiperMainMovies(await getTmdb(url));
    }

    return (
        <>
            <AppContext.Provider value = {{
                swiperMovies,
                SwiperMoviesNowPlaying,
                swiperMainMovies,
                SwiperMainMoviesNowPlaying
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