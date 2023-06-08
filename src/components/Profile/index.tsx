import { useEffect, useState } from "react";
import { Search, SearchTMDBType, TypeSearch, typeAccount } from "../../Types";
import { useAuth } from "../../context/AuthProvider/useAuth"
import { URLValues, getTmdb } from "../../services/Api";
import {CardAdmin} from "../CardAdmin";
import { PaginationComponent } from "../PaginationComponent";
import { ScrollToTop } from "../ScrollToTop";


export const Profile = ()=>{

    const  {user} = useAuth();

    const [search,setSearch] = useState({text : "", cards : []} as Search) ;

    const [feature,setFeature] = useState({typeContent : "Filme", typeOp : "Adicionar"} as TypeSearch)

    const handleFieldsChange = (e : {currentTarget : {value : string}})=>{
        setSearch({...search, text : e.currentTarget.value})
    }

    const changeLabel = (e : any)=>{
        const label = e.currentTarget.parentNode.querySelector("label") ;

        if(label.getAttribute("for") == "search"){
            if(search.text != "")
                label.innerHTML = ""
            else {
                label.innerHTML = "Digite o Título do Filmes, Serie..."
            }  
        }
    }
    
    const SearchCards = async (e: { keyCode: number; })=>{
        if(e.keyCode == 13){
            if(feature.typeContent == "Filme"){
                const url = `${URLValues.searchMovie}${URLValues.api_key}&query=${search.text}&page=${1}`
                const searchTMDB = await getTmdb(url);

                const pages = searchTMDB.total_pages;
                let result = searchTMDB.results;

                if(pages == 1){
                    setSearch({...search,cards : result})
                }else{
                    Array.from(Array(pages), async (item,index)=>{
                        if(index+1 != 1){
                            const url = `${URLValues.searchMovie}${URLValues.api_key}&query=${search.text}&page=${index+1}`
                            const searchTMDB = await getTmdb(url);
                            result = [...result,...searchTMDB.results]
                            setSearch({...search,cards : result})
                        }
                    })
                }
            } else {

                const url = `${URLValues.searchSerieAnimes}${URLValues.api_key}&query=${search.text}&page=${1}`
                const searchTMDB = await getTmdb(url);
                
                
                const pages = searchTMDB.total_pages;
                let result = searchTMDB.results;

                if(pages == 1){
                    setSearch({...search,cards : result})
                }else{
                    Array.from(Array(pages), async (item,index)=>{
                        if(index+1 != 1){
                            const url = `${URLValues.searchSerieAnimes}${URLValues.api_key}&query=${search.text}&page=${index+1}`
                            const searchTMDB = await getTmdb(url);
                            result = [...result,...searchTMDB.results]
                            setSearch({...search,cards : result})
                        }
                    })
                }
            }
        }
        
    }

    const itensPerPage = 15;
    const [currentPage,setCurrentPage] = useState(0)

    const pages = Math.ceil(search.cards.length / itensPerPage)
    const startIndex = currentPage * itensPerPage
    const endIndex = startIndex + itensPerPage
    const currentItens = search.cards.slice(startIndex,endIndex)


    if(user && user.typeOfAccount == typeAccount.admin){
    return(
        <>
            <ScrollToTop></ScrollToTop>
            <section className="Profile flex-column container">
                <div className="UserInf mb-2">
                    <p className="typeOfAccount">Administrador</p>
                    <h1>Williams Wallace</h1>
                </div>
                <div className="featuresProfile container flex-column">
                        <ul className="menu-list flex-center mb-3">
                                <li className="menu-item flex-center flex-column mr-2 px-3" >
                                    <h3 className="">Filmes</h3>
                                    <ul className="menu-options flex-center">
                                            <li className="mr-2">Gerenciar</li>
                                            <li>Adicionar</li>
                                    </ul>
                                </li>
                                <li className="menu-item flex-center flex-column mr-2 px-3" >
                                    <h3 className="">Séries</h3>
                                    <ul className="menu-options flex-center">
                                            <li className="mr-2">Gerenciar</li>
                                            <li>Adicionar</li>
                                    </ul>
                                </li>
                                <li className="menu-item flex-center flex-column px-3" >
                                    <h3 className="">Animes</h3>
                                    <ul className="menu-options flex-center">
                                            <li className="mr-2">Gerenciar</li>
                                            <li>Adicionar</li>
                                    </ul>
                                </li>
                                
                                
                        </ul>
                        {feature.typeOp == "Adicionar" ? 
                            <div className="inputSearch">
                            <input className="" type="text" id="search" value={search.text} onChange={handleFieldsChange}  onBlur={changeLabel} onKeyDown={SearchCards} placeholder=""/>
                            <label className="" htmlFor="search">Digite o Título do Filmes, Serie...</label>
                        </div> 
                                :
                        <></>
                        }
                        <section className="cardContainer flex-center flex-wrap p-1 mt-3">
                            {
                                currentItens ? currentItens.map((card)=>{
                                    return(
                                        <>
                                            <CardAdmin card = {card} typeOp = {feature.typeOp} typeContent = {feature.typeContent}></CardAdmin>
                                        </>
                                    )
                                }) : <></>
                                
                            }
                        </section>
                        <PaginationComponent pages = {pages} setCurrentPage={setCurrentPage} currentPage = {currentPage}></PaginationComponent>
                        
                </div>
                
            </section>
            
        </>
    )
    }else return(
        <>
        
        </>
    )
}