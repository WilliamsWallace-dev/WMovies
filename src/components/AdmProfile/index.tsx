import { useContext, useEffect, useState } from "react";
import { Search, TypeSearch } from "../../Types";
import { useAuth } from "../../context/AuthProvider/useAuth"
import { URLValues, getTmdb } from "../../services/Api";
import {CardAdmin} from "../CardAdmin";
import { PaginationComponent } from "../PaginationComponent";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

import SearchPageImage from "../../assets/background/SearchPageImage.png"
import { Loading } from "../Loading";


export const AdmProfile = ()=>{

    const  {user,logout} = useAuth();
    // console.log(user)

    const [search,setSearch] = useState({text : "", cards : []} as Search) ;

    const [feature,setFeature] = useState({typeContent : "Filme",typeOp : "Gerenciar"} as TypeSearch)

    const {moviesList,seriesList,animesList} = useContext(AppContext)

    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        if(search.text){
            const label = document.querySelector("#searchLabel") ;
            if(label != null) label.innerHTML = ""
        }
    },[loading])


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
            setLoading(false)
            if(feature.typeContent == "Filme"){
                const url = `${URLValues.searchMovie}${URLValues.api_key}&query=${search.text}&language=pt-BR&page=${1}`
                const searchTMDB = await getTmdb(url);
                setLoading(true)

                let result = searchTMDB.results;

                if(searchTMDB.total_pages == 1){
                    setSearch({...search,cards : result})
                }else{
                    Array.from(Array(searchTMDB.total_pages), async (item,index)=>{
                        if(index != 0 && item){
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
                setLoading(true)
                              
                let result = searchTMDB.results;

                if(searchTMDB.total_pages == 1){
                    setSearch({...search,cards : result})
                }else{
                    Array.from(Array(searchTMDB.total_pages), async (item,index)=>{
                        if(index != 0 && item){
                            const url = `${URLValues.searchSerieAnimes}${URLValues.api_key}&query=${search.text}&language=pt-BR&page=${index+1}`
                            const searchTMDB = await getTmdb(url);
                            result = [...result,...searchTMDB.results]
                            index < searchTMDB.total_pages && setSearch({...search,cards : result})
                        }
                    })
                }
            }else if(feature.typeContent == "Anime") {
                let url = `${URLValues.searchSerieAnimes}${URLValues.api_key}&query=${search.text}&language=pt-BR&page=${1}`;
                let searchTMDB = await getTmdb(url);
                let result = searchTMDB.results;

                

                if(searchTMDB.total_pages > 1){
                    Array.from(Array(searchTMDB.total_pages), async (item,index)=>{
                        if(index != 0 && item){
                            const url = `${URLValues.searchSerieAnimes}${URLValues.api_key}&query=${search.text}&language=pt-BR&page=${index+1}`
                            const searchTMDB = await getTmdb(url);
                            result = [...result,...searchTMDB.results]
                        }
                    })
                }
                    url = `${URLValues.searchMovie}${URLValues.api_key}&query=${search.text}&language=pt-BR&page=${1}`
                    searchTMDB = await getTmdb(url);
                    result = [...result, ...searchTMDB.results];
                    setLoading(true)

                    

                    if(searchTMDB.total_pages == 1){
                        setSearch({...search,cards : result})
                    }else{
                        Array.from(Array(searchTMDB.total_pages), async (item,index)=>{
                            if(index != 0 && item){
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
        
        // else setSearch({text : "", cards : []} )
    },[feature.typeContent,feature.typeOp])
    
    useEffect(()=>{
        
        if(feature.typeOp == "Gerenciar"){
            if(feature.typeContent == "Filme") {setSearch({text : "", cards : moviesList} );}
            else if(feature.typeContent == "Série") setSearch({text : "", cards : seriesList} );
            else if(feature.typeContent == "Anime") {setSearch({text : "", cards : animesList} ); }
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


    if(!loading && feature.typeOp == "Adicionar"){
        return (
            <>
                <Loading></Loading>
            </>
        )
    } else return(
            <>
                <div className="backgroundUserProfile flex-center">
                    <img src= {"https://www.xtrafondos.com/wallpapers/el-hombre-arana-artwork-5749.jpg"} alt={`Profile's Background`} />
                </div>
                <section className="Profile container flex-column">
                    {/* <div className="UserContainer mb-4">
                        <p className="typeOfAccount">Administrador</p>
                        <div className="flex-center flex-between">
                            <h1>Williams Wallace</h1>
                            <button className="LogoutButton p4" onClick={()=>{logout() ; navigate("/")}}>Sair</button>
                        </div>
                    </div> */}
                     <section className="UserContainer flex-center flex-between">
                        <div className="flex-center">
                            <div className="UserAvatar">
                                <div className="imgAvatar"><img src={"https://i.pinimg.com/564x/96/92/6d/96926d67490846b11e0f8cbdc787118c.jpg"} alt="" /></div>
                            </div>
                            <div className="UserInf flex-center flex-column ml-3">
                                <p className="typeOfAccount">Administrador</p>
                                <h1>{user.username || "Williams Wallace"}</h1>
                            </div> 
                        </div>
                            
                            <button className="LogoutButton p4" onClick={()=>{logout() ; navigate("/")}}>Sair</button>
                
                    </section>

                    <section className="filterMenu flex-center flex-space-around w-100 mt-5 mb-2" >
                        <div>
                            <button className="second-button mr-2" onClick={()=>{setFeature({...feature,typeContent : "Filme"})}}>Filme</button>
                            <button className="second-button mr-2" onClick={()=>{setFeature({...feature,typeContent : "Série"})}}>Séries</button>
                            <button className="second-button" onClick={()=>{setFeature({...feature,typeContent : "Anime"})}}>Animes</button>
                        </div>
                        <div className="selectFilter-menu">
                                    <label htmlFor="Categoria" className="p2 mr-1">Categoria</label>
                                    <select name="Categoria" id="Categoria" className="categorySelect mr-3 p2" onChange={(e)=>{ (e.currentTarget.value == "Gerenciar" || e.currentTarget.value == "Adicionar") && setFeature({...feature,typeOp : e.currentTarget.value})}}>
                                        <option value="Gerenciar">Gerenciar</option>
                                        <option value="Adicionar">Adicionar</option>
                                    </select>
                        </div>
                    </section>
                    
                    <div className="featuresProfile flex-center flex-column margin-0-auto ">
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
                                    currentItens.length ? currentItens.map((card)=>{
                                        return(
                                            <>
                                                <CardAdmin card = {card} typeOp = {feature.typeOp} typeContent = {feature.typeContent}></CardAdmin>
                                            </>
                                        )
                                    }) : <>
                                            <div className="flex-center flex-column my-2">
                                                <div><img src={SearchPageImage} alt="Imagem de Picoca" /></div>
                                            </div>
                                        </> 
                                    
                                }
                            </section>
                            <PaginationComponent pages = {pages} setCurrentPage={setCurrentPage} currentPage = {currentPage}></PaginationComponent>
                            
                    </div>
                    
                </section>
                
            </>
        )
    }


{/* <section className="Profile flex-column container">
                    <section className="UserContainer flex-center flex-between">
                        <div className="flex-center">
                            <div className="UserAvatar"></div>
                            <div className="UserInf flex-center flex-column ml-3">
                                <p className="typeOfAccount">Usuário</p>
                                <h1>Williams Wallace</h1>
                                <ul className="UserInf-menu flex-center flex-column w-100 mt-1 ">
                                    <li className="UserInf-item flex-center flex-between w-100">
                                        <p className="typeContent p2">Filme</p>
                                        <div className="flex-center">
                                            <p className="qtdSeeLater p2 mx-3">{movie.favorites != undefined && movie.favorites.length > 0 ? movie.favorites.length : 0}</p>
                                            <p className="qtdFavorite p2">{movie.seeLater != undefined && movie.seeLater.length > 0 ? movie.seeLater.length : 0}</p>
                                        </div>
                                    </li>
                                    <li className="UserInf-item flex-center flex-between w-100">
                                        <p className="typeContent p2">Série</p>
                                        <div className="flex-center">
                                            <p className="qtdSeeLater p2 mx-3">{serie.favorites != undefined && serie.favorites.length > 0 ? serie.favorites.length : 0}</p>
                                            <p className="qtdFavorite p2">{serie.seeLater != undefined && serie.seeLater.length > 0 ? serie.seeLater.length : 0}</p>
                                        </div>
                                    </li>
                                    <li className="UserInf-item flex-center flex-between w-100">
                                        <p className="typeContent p2">Anime</p>
                                        <div className="flex-center">
                                            <p className="qtdSeeLater p2 mx-3">{anime.favorites != undefined && anime.favorites.length > 0 ? anime.favorites.length : 0}</p>
                                            <p className="qtdFavorite p2">{anime.seeLater != undefined && anime.seeLater.length > 0 ? anime.seeLater.length : 0}</p>
                                        </div>
                                    </li>
                                    
                                </ul>
                            </div> 
                        </div>
                            
                            <button className="LogoutButton p4" onClick={()=>{logout() ; navigate("/")}}>Sair</button>
                
                    </section>
                    <section className="filterMenu flex-center flex-between w-100 mt-5 mb-2" >
                            <div>
                                <button className="second-button favoriteActive mr-2" onClick={(e)=>{favoritesActive(e)}}>Favoritos</button>
                                <button className="second-button seeLater" onClick={(e)=>{seeLaterActive(e)}}>Ver Depois</button>
                            </div>
                            <div className="inputSearch">
                                    <input className="" type="text" id="search" value={search} onChange={handleFieldsChange}  onBlur={changeLabel} onKeyDown={SearchCards} placeholder=""/>
                                    <label id="searchLabel" htmlFor="search">Digite o Título do Filmes, Serie...</label>
                            </div> 
                            <div className="selectFilter-menu">
                                <label htmlFor="Categoria" className="p2 mr-1">Categoria</label>

                                <select name="Categoria" id="Categoria" className="categorySelect mr-3 p2" onChange={()=> filterSelect()}>
                                    <option value="Todos">Todos</option>
                                    <option value="Filme">Filme</option>
                                    <option value="Série">Série</option>
                                    <option value="Anime">Anime</option>
                                </select>

                                <label htmlFor="Gênero" className="p2 mr-1">Gênero</label>

                                <select name="Gênero" id="Gênero" className="genreSelect p2" onChange={()=> filterSelect()}>
                                    <option value="Todos">Todos</option>
                                    {Genre.All.map((e)=>{
                                        return (
                                            <>
                                                <option value={e.id}>{e.name}</option>
                                            </>
                                        )
                                    })}
                                </select>
                            </div>
                            
                    </section>


                    <div className="featuresProfile container flex-column ">
                        <div className="popCorn-left "></div>
                        <div className="popCorn-right "></div>
                            <section className="cardContainer flex-center flex-wrap py-4 mt-3">
                                {
                                    currentItens ? currentItens.map((card)=>{
                                        return(
                                            <>
                                                <div className="m-2">
                                                    <Card card = {card} key = {card.id}></Card>
                                                </div>
                                                
                                            </>
                                        )
                                    }) : <></>
                                    
                                }
                            </section>
                            <PaginationComponent pages = {pages} setCurrentPage={setCurrentPage} currentPage = {currentPage}></PaginationComponent>            
                    </div>
                    
                </section>



 */}






// import { useContext, useEffect, useState } from "react";
// import { Search, TypeSearch, typeAccount } from "../../Types";
// import { useAuth } from "../../context/AuthProvider/useAuth"
// import { URLValues, getTmdb } from "../../services/Api";
// import {CardAdmin} from "../CardAdmin";
// import { PaginationComponent } from "../PaginationComponent";
// import { AppContext } from "../../context/AppContext";
// import { useNavigate } from "react-router-dom";


// export const AdmProfile = ()=>{

//     const  {user,logout} = useAuth();
//     // console.log(user)

//     const [search,setSearch] = useState({text : "", cards : []} as Search) ;

//     const [feature,setFeature] = useState({typeContent : "Filme",typeOp : "Gerenciar"} as TypeSearch)

//     const {moviesList,seriesList,animesList} = useContext(AppContext)


//     const handleFieldsChange = (e : {currentTarget : {value : string}})=>{
//         setSearch({...search, text : e.currentTarget.value})
//     }

//     const changeLabel = (e : any)=>{
//         const label = e.currentTarget.parentNode.querySelector("label") ;
//         console.log(label)

//             if(search.text != "")
//                 label.innerHTML = ""
//             else {
//                 label.innerHTML = "Digite o Título do Filmes, Serie..."
//             }  
//     }
    
//     const SearchCards = async (e: { keyCode: number; })=>{
//         if(e.keyCode == 13){
//             if(feature.typeContent == "Filme"){
//                 const url = `${URLValues.searchMovie}${URLValues.api_key}&query=${search.text}&language=pt-BR&page=${1}`
//                 const searchTMDB = await getTmdb(url);

//                 let result = searchTMDB.results;

//                 if(searchTMDB.total_pages == 1){
//                     setSearch({...search,cards : result})
//                 }else{
//                     Array.from(Array(searchTMDB.total_pages), async (item,index)=>{
//                         if(index != 0){
//                             const url = `${URLValues.searchMovie}${URLValues.api_key}&query=${search.text}&language=pt-BR&page=${index+1}`
//                             const searchTMDB = await getTmdb(url);
//                             result = [...result,...searchTMDB.results]
//                             index < searchTMDB.total_pages && setSearch({...search,cards : result})
//                         }
//                     })
//                 }
//             } else if(feature.typeContent == "Série") {

//                 const url = `${URLValues.searchSerieAnimes}${URLValues.api_key}&query=${search.text}&language=pt-BR&page=${1}`
//                 const searchTMDB = await getTmdb(url);
                              
//                 let result = searchTMDB.results;

//                 if(searchTMDB.total_pages == 1){
//                     setSearch({...search,cards : result})
//                 }else{
//                     Array.from(Array(searchTMDB.total_pages), async (item,index)=>{
//                         if(index != 0){
//                             const url = `${URLValues.searchSerieAnimes}${URLValues.api_key}&query=${search.text}&language=pt-BR&page=${index+1}`
//                             const searchTMDB = await getTmdb(url);
//                             result = [...result,...searchTMDB.results]
//                             index < searchTMDB.total_pages && setSearch({...search,cards : result})
//                         }
//                     })
//                 }
//             }else if(feature.typeContent == "Anime") {
//                 let url = `${URLValues.searchSerieAnimes}${URLValues.api_key}&query=${search.text}&language=pt-BR&page=${1}`
//                 let searchTMDB = await getTmdb(url);
//                 let result = searchTMDB.results;

                

//                 if(searchTMDB.total_pages > 1){
//                     Array.from(Array(searchTMDB.total_pages), async (item,index)=>{
//                         if(index != 0){
//                             const url = `${URLValues.searchSerieAnimes}${URLValues.api_key}&query=${search.text}&language=pt-BR&page=${index+1}`
//                             const searchTMDB = await getTmdb(url);
//                             result = [...result,...searchTMDB.results]
//                         }
//                     })
//                 }
//                     url = `${URLValues.searchMovie}${URLValues.api_key}&query=${search.text}&language=pt-BR&page=${1}`
//                     searchTMDB = await getTmdb(url);
//                     result = [...result, ...searchTMDB.results];

                    

//                     if(searchTMDB.total_pages == 1){
//                         setSearch({...search,cards : result})
//                     }else{
//                         Array.from(Array(searchTMDB.total_pages), async (item,index)=>{
//                             if(index != 0){
//                                 const url = `${URLValues.searchMovie}${URLValues.api_key}&query=${search.text}&language=pt-BR&page=${index+1}`
//                                 const searchTMDB = await getTmdb(url);
//                                 result = [...result,...searchTMDB.results]
//                                 index < searchTMDB.total_pages && setSearch({...search,cards : result})
//                             }
//                         })
//                     }
//             }
//         }
        
//     }

//     const itensPerPage = 15;
//     const [currentPage,setCurrentPage] = useState(0)
    
//     useEffect(()=>{

//         setSearch({text : "", cards : []} )
//         const label = document.querySelector("#searchLabel") ;
//         if(label != null) label.innerHTML = "Digite o Título do Filmes, Serie..."
        
//         // else setSearch({text : "", cards : []} )
//     },[feature.typeContent,feature.typeOp])
    
//     useEffect(()=>{
        
//         if(feature.typeOp == "Gerenciar"){
//             if(feature.typeContent == "Filme") {setSearch({text : "", cards : moviesList} ); console.log("ta errado aqui")}
//             else if(feature.typeContent == "Série") setSearch({text : "", cards : seriesList} );
//             else if(feature.typeContent == "Anime") {setSearch({text : "", cards : animesList} ); console.log("ta certo") }
//         }
//         // else setSearch({text : "", cards : []} )
//     },[feature.typeContent,feature.typeOp,moviesList,seriesList,animesList])

//     const pages = Math.ceil(search.cards.length / itensPerPage)
//     const startIndex = currentPage * itensPerPage
//     const endIndex = startIndex + itensPerPage
//     const currentItens = search.cards.slice(startIndex,endIndex)

//     const navigate = useNavigate();


//     // console.log(moviesList)
//     useEffect(()=>{
//         window.scrollTo(0,0);
//     },[currentPage])

//     // console.log(feature.typeContent, feature.typeOp)

//     if(user && user.typeOfAccount == typeAccount.admin){
//         return(
//             <>
//                 <section className="Profile flex-column container">
//                     <div className="UserContainer mb-4">
//                         <p className="typeOfAccount">Administrador</p>
//                         <div className="flex-center flex-between">
//                             <h1>Williams Wallace</h1>
//                             <button className="LogoutButton p4" onClick={()=>{logout() ; navigate("/")}}>Sair</button>
//                         </div>
                        
//                     </div>
//                     <div className="featuresProfile container flex-column ">
//                             <ul className="menu-list flex-center mb-3">
//                                     <li className="menu-item flex-center flex-column mr-2 px-3" >
//                                         <h3 className="">Filmes</h3>
//                                         <ul className="menu-options flex-center">
//                                                 <li className="mr-2" onClick = {()=>setFeature({typeContent : "Filme", typeOp : "Gerenciar"})}>Gerenciar</li>
//                                                 <li onClick = {()=>setFeature({typeContent : "Filme", typeOp : "Adicionar"})}>Adicionar</li>
//                                         </ul>
//                                     </li>
//                                     <li className="menu-item flex-center flex-column mr-2 px-3" >
//                                         <h3 className="">Séries</h3>
//                                         <ul className="menu-options flex-center">
//                                                 <li className="mr-2" onClick = {()=>setFeature({typeContent : "Série", typeOp : "Gerenciar"})}>Gerenciar</li>
//                                                 <li onClick = {()=>setFeature({typeContent : "Série", typeOp : "Adicionar"})}>Adicionar</li>
//                                         </ul>
//                                     </li>
//                                     <li className="menu-item flex-center flex-column px-3" >
//                                         <h3 className="">Animes</h3>
//                                         <ul className="menu-options flex-center">
//                                                 <li className="mr-2" onClick = {(e)=>{setFeature({typeContent : "Anime", typeOp : "Gerenciar"});}}>Gerenciar</li>
//                                                 <li onClick = {(e)=>{setFeature({typeContent : "Anime", typeOp : "Adicionar"});}}>Adicionar</li>
//                                         </ul>
//                                     </li>
                                    
                                    
//                             </ul>
//                             {feature.typeOp == "Adicionar" ? 
//                                 <div className="inputSearch mt-3">
//                                     <input className="" type="text" id="search" value={search.text} onChange={handleFieldsChange}  onBlur={changeLabel} onKeyDown={SearchCards} placeholder=""/>
//                                     <label id="searchLabel" htmlFor="search">Digite o Título do Filmes, Serie...</label>
//                                 </div> 
//                                     :
//                             <></>
//                             }
//                             <section className="cardContainer flex-center flex-wrap p-1 mt-3">
//                                 {
//                                     currentItens ? currentItens.map((card)=>{
//                                         return(
//                                             <>
//                                                 <CardAdmin card = {card} typeOp = {feature.typeOp} typeContent = {feature.typeContent}></CardAdmin>
//                                             </>
//                                         )
//                                     }) : <></>
                                    
//                                 }
//                             </section>
//                             <PaginationComponent pages = {pages} setCurrentPage={setCurrentPage} currentPage = {currentPage}></PaginationComponent>
                            
//                     </div>
                    
//                 </section>
                
//             </>
//         )
//     }