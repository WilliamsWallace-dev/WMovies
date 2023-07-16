import { ReactNode, createContext, useEffect, useState } from "react"; 

import { getDocumentDbCardList, DelDocumentDb, SetDocumentDbCardType } from "../services/Api";
import { AppContextType, CardType } from "../Types";


export const AppContext = createContext <AppContextType>({} as AppContextType);

export const AppProvidor = ({children} : {children : ReactNode}) =>{
    const [moviesList,setMoviesList] = useState <CardType []>([] as CardType [] );
    const [seriesList,setSeriesList] = useState <CardType []>([] as CardType []);
    const [animesList,setAnimesList] = useState <CardType []>([] as CardType []);
    const [mainCards,setMainCards] = useState ({} as {mainMovies : CardType[] , mainSeries : CardType [] , mainAnimes : CardType []});

    

    useEffect(()=>{
        GetLists();
        GetMainLists();
    },[])

    const GetLists = async ()=>{
        let result = await getDocumentDbCardList("Filme")
        setMoviesList(result);
         result = await getDocumentDbCardList("Série")
         setSeriesList(result);
         result = await getDocumentDbCardList("Anime")
         setAnimesList(result);
    }
    const GetMainLists = async ()=>{
        const result1 = await getDocumentDbCardList("MainMovies")
        console.log(result1)
        const result2 = await getDocumentDbCardList("MainSeries")
        const result3 = await getDocumentDbCardList("MainMovies")
        console.log(result3)
         setMainCards({mainMovies : result1,mainSeries : result2,mainAnimes : result3});
    }
    const SetLists = async (typeList : "Filme" | "Série" | "Anime", data : CardType , MainList? : boolean) =>{

        data = await SetDocumentDbCardType(typeList,data,MainList)
        if(MainList){
            if(typeList == "Filme"){
                setMainCards({...mainCards,mainMovies : [...mainCards.mainMovies,data]})
            }else if(typeList == "Série"){
                setMainCards({...mainCards,mainSeries : [...mainCards.mainSeries,data]})
            }else setMainCards({...mainCards,mainAnimes : [...mainCards.mainAnimes,data]})
        }else{
            if(typeList == "Filme"){
                setMoviesList([...moviesList,data])
            }else if(typeList == "Série"){
                    setSeriesList([...seriesList,data])
            }else setAnimesList([...animesList,data])
        }
        
    }
    const DelCard = async (typeList : "Filme" | "Série" | "Anime", data : CardType, MainList? : boolean) =>{

        
        if(MainList){
            if(typeList == "Filme"){
                setMainCards({...mainCards,mainMovies : mainCards.mainMovies.filter((card)=> card.id != data.id)})
                await DelDocumentDb("MainMovies", data)
            }else if(typeList == "Série"){
                setMainCards({...mainCards,mainSeries : mainCards.mainSeries.filter((card)=> card.id != data.id)})
                await DelDocumentDb("MainSeries", data)
            }else {
                setMainCards({...mainCards,mainAnimes : mainCards.mainMovies.filter((card)=> card.id != data.id)})
                await DelDocumentDb("MainAnimes", data)
            }
        }else{
            await DelDocumentDb(typeList, data)
            if(typeList == "Filme"){
                setMoviesList(moviesList.filter((card)=> card.id != data.id))
            }else if(typeList == "Série"){
                    setSeriesList(seriesList.filter((card)=> card.id != data.id))
            }else setAnimesList(animesList.filter((card)=> card.id != data.id ))
        }

        
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
                DelCard,
                mainCards
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