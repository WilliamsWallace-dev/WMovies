import { useEffect, useState } from "react";
import {CardType, Genre } from "../../Types";
import { useAuth } from "../../context/AuthProvider/useAuth"
import { updateDocumentUserAvatar } from "../../services/Api";
import { PaginationComponent } from "../PaginationComponent";
import { Link, useNavigate } from "react-router-dom";
import Card from "../Card";
import { avatarImg } from "../../assets/avatarImg";
import { MovieTime } from "../MovieTime";


export const UserProfile = ()=>{

    const  {user,logout,updateUserAvatar} = useAuth();
    console.log(user)

    const [cards,setCards] = useState < {listCard : CardType [] | undefined, contentType : "favorites" | "seeLater"}>({listCard : user.favorites , contentType : "favorites"}) ;

    const [search,setSearch] = useState("") ;

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
        setSearch(e.currentTarget.value)
    }

    const changeLabel = ()=>{
        const label = document.querySelector("#searchLabel") ;

            if(search != "" && label)
                label.innerHTML = ""
            else if(label) {
                console.log("mudei")
                label.innerHTML = "Digite o Título do Filmes, Serie..."
            }  
    }
    
    const SearchCards = async (e: { keyCode: number; })=>{
        if(search.length == 1 && e.keyCode == 8){
            filterSelect()
        } else
        if(e.keyCode == 13){
            let result = [] as CardType [] | undefined;
            // let auxResult = [] as CardType [] | undefined;
            const aux = search.split(" ");
            aux.forEach((text)=>{ 
                result = cards.listCard?.filter((card) => {
                    let found = false
                        if(card.name){
                            card.name.split(" ").forEach((e)=>{
                                if(e.length > 2 && e.toUpperCase() == text.toUpperCase())
                                    found = true;
                            })
                        }else if(card.title){
                            card.title.split(" ").forEach((e)=>{
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
            console.log(result)
            setCards({...cards, listCard : result})

        }
    }

    const seeLaterActive = (e: { currentTarget: any; })=>{

        
        setSearch("")
        const label = document.querySelector("#searchLabel")
        if(label != null) label.innerHTML = "Digite o Título do Filmes, Serie..."

        const aux = document.querySelector(".favoriteActive")
        aux?.classList.remove("favoriteActive")
        aux?.classList.add("favorite")

        const btn = e.currentTarget;
        btn.classList.toggle("seeLaterActive")
        btn.classList.toggle("seeLater")

        user.seeLater != undefined ? setCards({listCard : user.seeLater , contentType : "seeLater"}) : setCards({listCard : undefined , contentType : "seeLater"})
        
        document.querySelectorAll("select").forEach((element) =>{
            element.value = "Todos"           
        })
    }
    const favoritesActive = (e: { currentTarget: any; })=>{

        setSearch("")
        const label = document.querySelector("#searchLabel")
        if(label != null) label.innerHTML = "Digite o Título do Filmes, Serie..."
        

        const aux = document.querySelector(".seeLaterActive")
        aux?.classList.remove("seeLaterActive")
        aux?.classList.add("seeLater")

        const btn = e.currentTarget;
        btn.classList.toggle("favoriteActive")
        btn.classList.toggle("favorite")

        user.favorites != undefined ? setCards({listCard : user.favorites , contentType : "favorites"}) : setCards({listCard : undefined , contentType : "favorites"})
        
        document.querySelectorAll("select").forEach((element) =>{
            element.value = "Todos"           
        })
        
    }

    const itensPerPage = 15;
    const [currentPage,setCurrentPage] = useState(0)    

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

    console.log(user.typeOfAccount)
    // console.log(feature.typeContent, feature.typeOp)

    const filterSelect = ()=>{

        let listCard : CardType [] | undefined;

        setSearch("")
        const label = document.querySelector("#searchLabel")
        if(label != null) label.innerHTML = "Digite o Título do Filmes, Serie..."

        const filter = ["Todos","Todos"]
        document.querySelectorAll("select").forEach((element, index) =>{
            filter[index] = element.value            
        })

        if(filter[0] == "Todos"){
            listCard = user[cards.contentType]
        }else {
            listCard = user[cards.contentType]?.filter((card)=>{return card.typeContent == filter[0]})
        }

        let aux : CardType[] | undefined
        if(filter[1] != "Todos"){
            console.log(filter[1])
            aux = listCard?.filter((card)=>{
                let found = false
                card.genres?.forEach((e)=>{
                    if(e.id == Number(filter[1])){
                        found = true
                    }    
                })
                return found;
            })
            listCard = aux
        }

        setCards({...cards, listCard :listCard})
    }
    return(
        <>  
            <div className="backgroundUserProfile flex-center">
                    <img src= {user.avatar.imgBackground} alt={`Profile's Background`} />
            </div>
            <section className="Profile flex-column container">
                    <section className="UserContainer flex-center flex-between">
                        <div className="flex-center flex-wrap">
                            <div className="UserAvatar"  onMouseEnter = {(e)=>{e.currentTarget.children[0].classList.add("changeAvatarHover")}} onMouseLeave = {(e)=>{e.currentTarget.children[0].classList.remove("changeAvatarHover")}}  onClick={(e)=>{e.currentTarget.nextElementSibling?.classList.add("avatarBoardEnable")}}>
                                <div className="changeAvatar p5" >Change Avatar</div>
                                <div className="imgAvatar">
                                    <img src={user.avatar.imgAvatar} alt="" />  
                                </div>
                            </div>
                            <section className="avatarBoard flex-center">
                                <div className="avatarListContainer">
                                <ul className="avatarList flex-center flex-wrap">
                                    {
                                        avatarImg.map((avatar,index)=>{
                                            return(
                                                <>
                                                    <li className="avatarItem m-1" onClick={()=>updateUserAvatar(avatar,user)}>
                                                        <div className="imgAvatar"><img src = {avatar.imgAvatar} alt={`${index+1} Avatar`} /></div>
                                                    </li> 
                                                </>
                                            )
                                        })
                                    }   
                                </ul>
                                <button className="closeButton" onClick={(e)=>{e.currentTarget.parentElement?.parentElement?.classList.remove("avatarBoardEnable"),updateDocumentUserAvatar(user)}}>X</button>
                                </div>
                                
                                
                            </section>
                            <div className="UserInf flex-center flex-column ml-3">
                                <div className="flex-center flex-between w-100"><p className="typeOfAccount">Usuário</p>{window.innerWidth < 600 && <button className="tertiaryButton p4" onClick={()=>{logout() ; navigate("/")}}>Sair</button>}</div>
                                <h1 className="title">{user.username}</h1>
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
                            {window.innerWidth >= 600 && <button className="LogoutButton p4" onClick={()=>{logout() ; navigate("/")}}>Sair</button>}
                            
                
                    </section>

                    <section className="filterMenu flex-center flex-space-around flex-wrap w-100 mt-5 mb-2" >
                            <div className="mb-1">
                                <button className="second-button favoriteActive mr-2" onClick={(e)=>{favoritesActive(e)}}>Favoritos</button>
                                <button className="second-button seeLater" onClick={(e)=>{seeLaterActive(e)}}>Ver Depois</button>
                            </div>
                            <div className="inputSearch">
                                    <input className="" type="text" id="search" value={search} onChange={handleFieldsChange}  onBlur={changeLabel} onKeyDown={SearchCards} placeholder=""/>
                                    <label  id="searchLabel" htmlFor="search">Digite o Título do Filmes, Serie...</label>
                            </div> 
                            <div className="selectFilter-menu flex-center flex-wrap">
                                <div className="flex-center mb-1">
                                    <label htmlFor="Categoria" className="p2 mr-1">Categoria</label>

                                    <select name="Categoria" id="Categoria" className="categorySelect mr-3 p2" onChange={()=> filterSelect()}>
                                        <option value="Todos">Todos</option>
                                        <option value="Filme">Filme</option>
                                        <option value="Série">Série</option>
                                        <option value="Anime">Anime</option>
                                    </select>
                                </div>
                                <div className="flex-center">
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
                                

                                
                            </div>
                            
                    </section>


                    <div className="featuresProfile flex-center flex-column margin-0-auto ">
                        {/* <div className="popCorn-left "></div>
                        <div className="popCorn-right "></div> */}
                            <section className="cardContainer flex-center flex-wrap py-4 mt-3">
                                {
                                    currentItens && currentItens.length > 0 ? currentItens.map((card)=>{
                                        return(
                                            <>
                                                <div className="m-2">
                                                    <Link to={`../${card.typeContent}/${card.id}` }><Card card = {card} key = {card.id}></Card></Link>
                                                </div>
                                                
                                            </>
                                        )
                                    }) 
                                    : 
                                   <>
                                    <MovieTime></MovieTime>
                                    </>
                                    
                                }
                            </section>
                            <PaginationComponent pages = {pages} setCurrentPage={setCurrentPage} currentPage = {currentPage}></PaginationComponent>
                            {/* <section className="cardContainer flex-center flex-wrap p-1 mt-3">
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
                            <PaginationComponent pages = {pages} setCurrentPage={setCurrentPage} currentPage = {currentPage}></PaginationComponent> */}
                            
                    </div>
                    
                </section>
        </>
    )
}