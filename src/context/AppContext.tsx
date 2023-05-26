import { ReactNode, createContext, useState } from "react"; 

import { tmdb,URLValues } from "../services/Api";

type TodoContextType = {SwiperMoviesTopRated : ()=> Promise<void> }

export const AppContext = createContext <TodoContextType | null>( null);

export const AppProvidor = ({children} : {children : ReactNode}) =>{
    const [swiperMovies,setSwiperMovies] = useState ([]);

    const getTmdb = async (url : string)=>{
        const res = await tmdb.get(url);
        const data = await res.data.jason()
        console.log(data)
        return data;
    }
    const SwiperMoviesTopRated = async ()=>{
        const url = `${URLValues.movies}${URLValues.topRated}${URLValues.api_key}`
        await getTmdb(url)
        // setSwiperMovies(await getTmdb(url));
    }

    return (
        <>
            <AppContext.Provider value = {{
                // swiperMovies,
                SwiperMoviesTopRated
            }}>
                {children}
            </AppContext.Provider>
        </>
    )
}   

