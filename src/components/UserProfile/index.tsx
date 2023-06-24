import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Search, TypeSearch, typeAccount, CardType } from "../../Types";
import { useAuth } from "../../context/AuthProvider/useAuth"
import { URLValues, getTmdb } from "../../services/Api";
import {CardAdmin} from "../CardAdmin";
import { PaginationComponent } from "../PaginationComponent";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import Card from "../Card";


export const UserProfile = ()=>{

    const  {user,logout} = useAuth();
    // console.log(user)

    const [cards,setCards] = useState < {listCard : CardType [] | undefined, contentType : "favorites" | "seeLater"}>({listCard : user.favorites , contentType : "favorites"}) ;

    const [search,setSearch] = useState({text : "", cards : []} as Search) ;

    // const [feature,setFeature] = useState({} as TypeSearch)

    // const {moviesList,seriesList,animesList} = useContext(AppContext)

    // let movie : {favorites: CardType[] | undefined;
    //     seeLater: CardType[] | undefined;}
    // let serie : {favorites: CardType[] | undefined;
    //     seeLater: CardType[] | undefined;}
    // let anime : {favorites: CardType[] | undefined;
    //         seeLater: CardType[] | undefined;}

        const movie = {
            favorites : user.favorites && user.favorites.filter((card)=>{return card.typeContent == "Filme"}),
            seeLater : user.seeLater && user.seeLater.filter((card)=>{return card.typeContent == "Filme"})
        }
        const serie = {
            favorites : user.favorites && user.favorites.filter((card)=>{return card.typeContent == "Série"}),
            seeLater : user.seeLater && user.seeLater.filter((card)=>{return card.typeContent == "Série"})
        }
        const anime = {
            favorites : user.favorites && user.favorites.filter((card)=>{return card.typeContent == "Anime"}),
            seeLater : user.seeLater && user.seeLater.filter((card)=>{return card.typeContent == "Anime"})
        }

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
        console.log("search cards")
        
    }

    const itensPerPage = 15;
    const [currentPage,setCurrentPage] = useState(0)
    
    // useEffect(()=>{

    //     setSearch({text : "", cards : []} )
    //     const label = document.querySelector("#searchLabel") ;
    //     if(label != null) label.innerHTML = "Digite o Título do Filmes, Serie..."
        
    //     if(feature.typeOp == "Gerenciar"){
    //         if(feature.typeContent == "Filme") {setSearch({text : "", cards : moviesList} ); console.log("ta errado aqui")}
    //         else if(feature.typeContent == "Série") setSearch({text : "", cards : seriesList} );
    //         else if(feature.typeContent == "Anime") {setSearch({text : "", cards : animesList} ); console.log("ta certo") }
    //     }
    //     // else setSearch({text : "", cards : []} )
    // },[feature.typeContent,feature.typeOp,moviesList,seriesList,animesList])

    

    const pages = cards.listCard ? Math.ceil(cards.listCard.length / itensPerPage) : 0
    const startIndex = currentPage * itensPerPage
    const endIndex = startIndex + itensPerPage
    const currentItens =  cards.listCard ? cards.listCard.slice(startIndex,endIndex) : [] as  CardType []


    const navigate = useNavigate();

    // console.log(user.favorites)
    // console.log(moviesList)

    useEffect(()=>{
        window.scrollTo(0,0);
    },[currentPage])

    // console.log(feature.typeContent, feature.typeOp)

    const filterSelect = ()=>{
        // let result : CardType [] | undefined
        // if(cards.contentType == "favorite"){
        //       result = user.favorites;
        // }else if(cards.contentType == "seeLater"){
        //      result = user.seeLater;
        // }

        let listCard : CardType [] | undefined;

        const filter = ["Todos","Todos"]
        document.querySelectorAll("select").forEach((element, index) =>{
            filter[index] = element.value            
        })

        if(filter[0] == "Todos"){
            listCard = user[cards.contentType]
        }else {
            listCard = user[cards.contentType]?.filter((card)=>{return card.typeContent == filter[0]})
        }

        setCards({...cards, listCard :listCard})
        // switch (filter[0]){
        //     case "Todos" : 
        //         switch (cards.contentType){
        //             case "favorites":
        //                 cards.listCard = user.favorites
        //                 break;
        //             case "seeLater":
        //                 cards.listCard = user.seeLater
        //                 break;
        //         }
        //         break;
        //     case "Filme":
        //         cards.listCard = movie.favorites
        //         break;
        // }
    }
    // const filterSelectGenre = (e: ChangeEvent<HTMLSelectElement>)=>{
    //     console.log(e.target.value)
    // }


    return(
        <>
            <section className="Profile flex-column container">
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
                                <button className="second-button favorite mr-2" onClick={()=>{user.favorites != undefined ? setCards({listCard : user.favorites , contentType : "favorites"}) : setCards({listCard : undefined , contentType : "favorites"})}}>Favoritos</button>
                                <button className="second-button seeLater" onClick={()=>{user.seeLater != undefined ? setCards({listCard : user.seeLater , contentType : "seeLater"}) : setCards({listCard : undefined , contentType : "seeLater"})}}>Ver Depois</button>
                            </div>
                            <div className="inputSearch">
                                    <input className="" type="text" id="search" value={search.text} onChange={handleFieldsChange}  onBlur={changeLabel} onKeyDown={SearchCards} placeholder=""/>
                                    <label id="searchLabel" htmlFor="search">Digite o Título do Filmes, Serie...</label>
                            </div> 
                            <div className="selectFilter-menu">
                                <label htmlFor="Categoria" className="p2 mr-1">Categoria</label>

                                <select name="Categoria" id="Categoria" className="categorySelect mr-3 p2" onChange={()=> filterSelect()}>
                                    <option value="Todos">Todos</option>
                                    <option value="Filme">Filme</option>
                                    <option value="Série">Série</option>
                                    <option value="Anime">Anime</option>filterSelectGenre
                                </select>

                                <label htmlFor="Gênero" className="p2 mr-1">Gênero</label>

                                <select name="Gênero" id="Gênero" className="genreSelect p2" onChange={()=> filterSelect()}>
                                    <option value="Todos">Todos</option>
                                    <option value="Filme">Filme</option>
                                    <option value="Série">Série</option>
                                    <option value="Anime">Anime</option>
                                </select>
                            </div>
                            
                    </section>


                    <div className="featuresProfile container flex-column ">
                            {/* <ul className="menu-list flex-center mb-3">
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
                                                <li className="mr-2" onClick = {(e)=>{setFeature({typeContent : "Anime", typeOp : "Gerenciar"}); changeLabel(e)}}>Gerenciar</li>
                                                <li onClick = {(e)=>{setFeature({typeContent : "Anime", typeOp : "Adicionar"}); changeLabel(e)}} >Adicionar</li>
                                        </ul>
                                    </li>
                                    
                                    
                            </ul> */}
                            {/* {feature.typeOp == "Adicionar" ? 
                                <div className="inputSearch mt-3">
                                    <input className="" type="text" id="search" value={search.text} onChange={handleFieldsChange}  onBlur={changeLabel} onKeyDown={SearchCards} placeholder=""/>
                                    <label id="searchLabel" htmlFor="search">Digite o Título do Filmes, Serie...</label>
                                </div> 
                                    :
                            <></>
                            } */}
                            <section className="cardContainer flex-center flex-wrap p-1 mt-3">
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
        </>
    )
}