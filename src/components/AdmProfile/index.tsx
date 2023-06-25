import { useContext, useEffect, useState } from "react";
import { Search, TypeSearch, typeAccount } from "../../Types";
import { useAuth } from "../../context/AuthProvider/useAuth"
import { URLValues, getTmdb } from "../../services/Api";
import {CardAdmin} from "../CardAdmin";
import { PaginationComponent } from "../PaginationComponent";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";


export const AdmProfile = ()=>{

    const  {user,logout} = useAuth();
    // console.log(user)

    const [search,setSearch] = useState({text : "", cards : []} as Search) ;

    const [feature,setFeature] = useState({typeContent : "Filme",typeOp : "Gerenciar"} as TypeSearch)

    const {moviesList,seriesList,animesList} = useContext(AppContext)


    const handleFieldsChange = (e : {currentTarget : {value : string}})=>{
        setSearch({...search, text : e.currentTarget.value})
    }

    const changeLabel = (e : any)=>{
        const label = e.currentTarget.parentNode.querySelector("label") ;
        console.log(label)

            if(search.text != "")
                label.innerHTML = ""
            else {
                label.innerHTML = "Digite o Título do Filmes, Serie..."
            }  
    }
    
    const SearchCards = async (e: { keyCode: number; })=>{
        if(e.keyCode == 13){
            if(feature.typeContent == "Filme"){
                const url = `${URLValues.searchMovie}${URLValues.api_key}&query=${search.text}&language=pt-BR&page=${1}`
                const searchTMDB = await getTmdb(url);

                console.log(search)

                let result = searchTMDB.results;

                if(searchTMDB.total_pages == 1){
                    setSearch({...search,cards : result})
                }else{
                    Array.from(Array(searchTMDB.total_pages), async (item,index)=>{
                        if(index != 0){
                            const url = `${URLValues.searchMovie}${URLValues.api_key}&query=${search.text}&language=pt-BR&page=${index+1}`
                            const searchTMDB = await getTmdb(url);
                            result = [...result,...searchTMDB.results]
                            index < searchTMDB.total_pages && setSearch({...search,cards : result})
                        }
                    })
                }
            } else if(feature.typeContent == "Série") {

                const url = `${URLValues.searchSerieAnimes}${URLValues.api_key}&query=${search.text}&language=pt-BR&page=${1}`
                const searchTMDB = await getTmdb(url);
                              
                let result = searchTMDB.results;

                if(searchTMDB.total_pages == 1){
                    setSearch({...search,cards : result})
                }else{
                    Array.from(Array(searchTMDB.total_pages), async (item,index)=>{
                        if(index != 0){
                            const url = `${URLValues.searchSerieAnimes}${URLValues.api_key}&query=${search.text}&language=pt-BR&page=${index+1}`
                            const searchTMDB = await getTmdb(url);
                            result = [...result,...searchTMDB.results]
                            index < searchTMDB.total_pages && setSearch({...search,cards : result})
                        }
                    })
                }
            }else if(feature.typeContent == "Anime") {
                let url = `${URLValues.searchSerieAnimes}${URLValues.api_key}&query=${search.text}&language=pt-BR&page=${1}`
                let searchTMDB = await getTmdb(url);
                let result = searchTMDB.results;

                

                if(searchTMDB.total_pages > 1){
                    Array.from(Array(searchTMDB.total_pages), async (item,index)=>{
                        if(index != 0){
                            const url = `${URLValues.searchSerieAnimes}${URLValues.api_key}&query=${search.text}&language=pt-BR&page=${index+1}`
                            const searchTMDB = await getTmdb(url);
                            result = [...result,...searchTMDB.results]
                        }
                    })
                }
                    url = `${URLValues.searchMovie}${URLValues.api_key}&query=${search.text}&language=pt-BR&page=${1}`
                    searchTMDB = await getTmdb(url);
                    result = [...result, ...searchTMDB.results];

                    

                    if(searchTMDB.total_pages == 1){
                        setSearch({...search,cards : result})
                    }else{
                        Array.from(Array(searchTMDB.total_pages), async (item,index)=>{
                            if(index != 0){
                                const url = `${URLValues.searchMovie}${URLValues.api_key}&query=${search.text}&language=pt-BR&page=${index+1}`
                                const searchTMDB = await getTmdb(url);
                                result = [...result,...searchTMDB.results]
                                index < searchTMDB.total_pages && setSearch({...search,cards : result})
                            }
                        })
                    }
            }
        }
        
    }

    const itensPerPage = 15;
    const [currentPage,setCurrentPage] = useState(0)
    
    useEffect(()=>{

        setSearch({text : "", cards : []} )
        const label = document.querySelector("#searchLabel") ;
        if(label != null) label.innerHTML = "Digite o Título do Filmes, Serie..."
        
        if(feature.typeOp == "Gerenciar"){
            if(feature.typeContent == "Filme") {setSearch({text : "", cards : moviesList} ); console.log("ta errado aqui")}
            else if(feature.typeContent == "Série") setSearch({text : "", cards : seriesList} );
            else if(feature.typeContent == "Anime") {setSearch({text : "", cards : animesList} ); console.log("ta certo") }
        }
        // else setSearch({text : "", cards : []} )
    },[feature.typeContent,feature.typeOp,moviesList,seriesList,animesList])

    

    const pages = Math.ceil(search.cards.length / itensPerPage)
    const startIndex = currentPage * itensPerPage
    const endIndex = startIndex + itensPerPage
    const currentItens = search.cards.slice(startIndex,endIndex)

    const navigate = useNavigate();


    // console.log(moviesList)
    useEffect(()=>{
        window.scrollTo(0,0);
    },[currentPage])

    // console.log(feature.typeContent, feature.typeOp)

    if(user && user.typeOfAccount == typeAccount.admin){
        return(
            <>
                <section className="Profile flex-column container">
                    <div className="UserContainer mb-4">
                        <p className="typeOfAccount">Administrador</p>
                        <div className="flex-center flex-between">
                            <h1>Williams Wallace</h1>
                            <button className="LogoutButton p4" onClick={()=>{logout() ; navigate("/")}}>Sair</button>
                        </div>
                        
                    </div>
                    <div className="featuresProfile container flex-column ">
                            <ul className="menu-list flex-center mb-3">
                                    <li className="menu-item flex-center flex-column mr-2 px-3" >
                                        <h3 className="">Filmes</h3>
                                        <ul className="menu-options flex-center">
                                                <li className="mr-2" onClick = {()=>setFeature({typeContent : "Filme", typeOp : "Gerenciar"})}>Gerenciar</li>
                                                <li onClick = {()=>setFeature({typeContent : "Filme", typeOp : "Adicionar"})}>Adicionar</li>
                                        </ul>
                                    </li>
                                    <li className="menu-item flex-center flex-column mr-2 px-3" >
                                        <h3 className="">Séries</h3>
                                        <ul className="menu-options flex-center">
                                                <li className="mr-2" onClick = {()=>setFeature({typeContent : "Série", typeOp : "Gerenciar"})}>Gerenciar</li>
                                                <li onClick = {()=>setFeature({typeContent : "Série", typeOp : "Adicionar"})}>Adicionar</li>
                                        </ul>
                                    </li>
                                    <li className="menu-item flex-center flex-column px-3" >
                                        <h3 className="">Animes</h3>
                                        <ul className="menu-options flex-center">
                                                <li className="mr-2" onClick = {(e)=>{setFeature({typeContent : "Anime", typeOp : "Gerenciar"});}}>Gerenciar</li>
                                                <li onClick = {(e)=>{setFeature({typeContent : "Anime", typeOp : "Adicionar"});}}>Adicionar</li>
                                        </ul>
                                    </li>
                                    
                                    
                            </ul>
                            {feature.typeOp == "Adicionar" ? 
                                <div className="inputSearch mt-3">
                                    <input className="" type="text" id="search" value={search.text} onChange={handleFieldsChange}  onBlur={changeLabel} onKeyDown={SearchCards} placeholder=""/>
                                    <label id="searchLabel" htmlFor="search">Digite o Título do Filmes, Serie...</label>
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