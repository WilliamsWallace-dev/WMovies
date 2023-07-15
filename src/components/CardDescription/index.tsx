
import { useEffect, useState, useContext } from "react"
import "../../style/style.css";
import { AppContextType, CardType, TypeContent } from "../../Types";
import { URLValues } from "../../services/Api";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

import { useAuth } from "../../context/AuthProvider/useAuth";
import { openVideoUtil } from "../../utils/videoUtil";



export default function CardDescription({cardContent ,stopSwiper} : {cardContent? : CardType , stopSwiper? : (videoKey : string) => void}){

    const {moviesList,seriesList,animesList} = useContext(AppContext) as AppContextType;

    const [card,setCard] = useState <CardType | undefined>({} as CardType)

    const {typeContent = "Filmes",id = "0"} = useParams<{typeContent : string , id : string}>();

    const {user,updateUserCards} = useAuth();
    const navigate = useNavigate();

    useEffect(()=>{
        if(!cardContent){
                switch (typeContent) {
                    case TypeContent.Filme : 
                        setCard(moviesList.find(movie => movie.id == parseInt(id)))
                        break;
                    case TypeContent.Série : 
                        setCard(seriesList.find(serie => serie.id == parseInt(id)))
                        break;
                    case TypeContent.Anime : 
                        setCard(animesList.find(anime => anime.id == parseInt(id)))
                        break;
                }

        }
        
    },[moviesList,seriesList,animesList,id])

    const ProtectedFunction = (action : ()=>void)=>{
        if(user && user.id){
            action();
        }else{
            navigate("/Login")
        }   
    }

    const seeLaterActive = (e: { currentTarget: any; },card : CardType)=>{
        const btn = e.currentTarget;

        btn.classList.toggle("saveButtonActive")
        btn.classList.toggle("saveButton")

        user && card && updateUserCards("seeLater",card,user)
        
    }
    const favoritesActive = (e: { currentTarget: any; },card : CardType)=>{
        const btn = e.currentTarget;

        btn.classList.toggle("likeButtonActive")
        btn.classList.toggle("likeButton")

        user && card && updateUserCards("favorites",card,user)
        
    }
    // console.log(cardContent)
    if(cardContent)
        return(
            <>
                <section className="SwiperDescriptionItem containerFlex px-2 ">
                    {window.innerWidth < 700 ? <></> : 
                    <div className="desciptionPoster mr-3 flex-center">
                        <img style={{}} src={`${URLValues.img_path_original}${cardContent?.poster_path}`} alt= {`Poste do Filmes : ${cardContent?.name || cardContent?.title}`} />
                    </div>
                    }
                    <div className="description flex-start flex-column align-items-flex-start">
                        <h1 className="title">{cardContent?.name || cardContent?.title}</h1>
                        <div className="flex-start mt-2">
                            {cardContent?.first_air_date || cardContent?.release_date ? <p className="p1 mr-3 pt-1">{cardContent?.first_air_date ? cardContent?.first_air_date.split('-')[0] : cardContent?.release_date.split('-')[0]}</p> : <></> }
                            {cardContent.runtime ? <p className="duration p5 mr-2 ">{`${Math.floor(cardContent.runtime/60)}h,${(cardContent.runtime%60)}min`}</p> : <p className="duration p5 mr-2 ">{cardContent.number_of_seasons > 1 ? `${cardContent.number_of_seasons} Temporadas` : `${cardContent.number_of_seasons} Temporada`}</p>}
                            <p className="rated p5">{cardContent.vote_average.toFixed(1)}</p>
                        </div>
                        <div className="actors flex-center flex-start mt-2">
                            {
                                cardContent?.credits ? cardContent?.credits.map((e)=>{
                                    return(
                                        <>
                                            <div className="actorsItem flex-start mr-3 my-1">
                                                <div className="imageActor mr-1"><img src={`${URLValues.img_path_original}${e.profile_path}`} alt={e.name} /></div>
                                                <p className="p2">{e.name}</p>
                                            </div>
                                        </>
                                    )
                                })
                                :
                                    <>
                                        <div className="productionCompanyItem mr-3">
                                                <div className="imageProductionCompany mr-1"><img src={`${URLValues.img_path_original}${cardContent.production_companies[0].logo_path}`} alt={cardContent.production_companies[0].name} /></div>
                                                
                                            </div>
                                    </>
                            }
                        </div>
                        <p className="sinopse text-left p1 mt-2">
                            {cardContent?.overview}
                        </p>
                        <div className="type flex-start mt-2">
                            {
                                cardContent?.genres && cardContent?.genres.map((genre)=>{
                                    return(
                                        <>
                                            <p className="typeItem p2 mr-2">{genre.name}</p>
                                        </>
                                    )
                                })
                            }
                        </div>
                        <div className="buttonsDescription flex-center mt-2">
                            {
                                (cardContent && user.seeLater != undefined) && user.seeLater.find((seeLaterCard)=> seeLaterCard.id === cardContent.id) ? <button className="saveButtonActive p3 mr-2" onClick= {(e)=>{ProtectedFunction(()=> seeLaterActive(e,cardContent))}}>Ver depois</button> : <button className="saveButton p3 mr-2" onClick= {(e)=>{ProtectedFunction(()=> cardContent && seeLaterActive(e,cardContent))}}>Ver depois</button>
                            }
                            {
                                (cardContent && user.favorites != undefined) && user.favorites.find((favoritesCard)=> favoritesCard.id === cardContent.id) ? <button className="likeButtonActive" onClick= {(e)=>{ProtectedFunction(()=> favoritesActive(e,cardContent))}}></button> : <button className="likeButton" onClick= {(e)=>{ProtectedFunction(()=> cardContent && favoritesActive(e,cardContent))}}></button>
                            }
                            {/* <button className="saveButton p3 mr-2" onClick= {()=>{ProtectedFunction(()=> (user && card) && updateUserCards("seeLater",card,user))}}> Ver depois</button>
                            <button className="likeButton" onClick= {()=>{ProtectedFunction(()=> (user && card) && updateUserCards("favorites",card,user))}}></button> */}
                        </div>
                        
                    </div>
                    {window.innerWidth < 960 ? <></> : cardContent.video ? <div className="playIcon" onClick={()=>cardContent.video && stopSwiper && stopSwiper(cardContent.video.key)}></div> : <div className="playIconDisable"></div>}
                    {/* { cardContent.video ? <div className="playIcon" onClick={()=>cardContent.video && stopSwiper && stopSwiper(cardContent.video.key)}></div> : <div className="playIconDisable"></div>} */}
                </section>
                <div className="backgroundPosterDescription">
                    <img src= {`${URLValues.img_path_original}${cardContent?.backdrop_path}`} alt={`Poste do filme ${cardContent?.title}`} />
                </div>
            </>
        )
    else
        return(
            <>
                <section className="SwiperDescriptionItem containerFlex ">
                {window.innerWidth < 960 ? <></> : 
                    <div className="desciptionPoster mr-3 flex-center">
                        <img style={{}} src={`${URLValues.img_path_original}${card?.poster_path}`} alt= {`Poste do Filmes : ${card?.name || card?.title}`} />
                    </div>
                    }
                    <div className="description flex-start flex-column align-items-flex-start">
                        <h1 className="title">{card?.name || card?.title}</h1>
                        <div className="flex-start mt-2">
                            {card?.first_air_date || card?.release_date ? <p className="p5 mr-3 pt-1">{card?.first_air_date ? card?.first_air_date.split('-')[0] : card?.release_date.split('-')[0]}</p> : <></> }
                            {card?.runtime ? <p className="duration p5 mr-2 ">{`${Math.floor(card?.runtime/60)}h,${(card?.runtime%60)}min`}</p> : <p className="duration p5 mr-2 ">{card?.number_of_seasons && card?.number_of_seasons > 1 ? `${card?.number_of_seasons} Temporadas` : `${card?.number_of_seasons} Temporada`}</p>}
                            <p className="rated p5">{card?.vote_average && card?.vote_average.toFixed(1)}</p>
                        </div>
                        <div className="actors flex-start mt-2">
                            {
                                card?.credits && card?.credits.map((e)=>{
                                    return(
                                        <>
                                            <div className="actorsItem flex-start mr-3">
                                                <div className="imageActor mr-1"><img src={`${URLValues.img_path_original}${e.profile_path}`} alt={e.name} /></div>
                                                <p className="p2">{e.name}</p>
                                            </div>
                                        </>
                                    )
                                })
                            }
                        </div>
                        <p className="sinopse text-left p1 mt-2">
                            {card?.overview}
                        </p>
                        <div className="type flex-start mt-2">
                            {
                                card?.genres && card?.genres.map((genre)=>{
                                    return(
                                        <>
                                            <p className="typeItem p2 mr-2">{genre.name}</p>
                                        </>
                                    )
                                })
                            }
                        </div>
                        <div className="buttonsDescription flex-center mt-2">
                            {
                                (card && user.seeLater != undefined) && user.seeLater.find((seeLaterCard)=> seeLaterCard.id === card.id) ? <button className="saveButtonActive p3 mr-2" onClick= {(e)=>{ProtectedFunction(()=> seeLaterActive(e,card))}}>Ver depois</button> : <button className="saveButton p3 mr-2" onClick= {(e)=>{ProtectedFunction(()=> card && seeLaterActive(e,card))}}>Ver depois</button>
                            }
                            {
                                (card && user.favorites != undefined) && user.favorites.find((favoritesCard)=> favoritesCard.id === card.id) ? <button className="likeButtonActive" onClick= {(e)=>{ProtectedFunction(()=> favoritesActive(e,card))}}></button> : <button className="likeButton" onClick= {(e)=>{ProtectedFunction(()=> card && favoritesActive(e,card))}}></button>
                            }
                            {/* <button className="saveButton p3 mr-2" onClick= {()=>{ProtectedFunction(()=> (user && card) && updateUserCards("seeLater",card,user))}}> Ver depois</button>
                            <button className="likeButton" onClick= {()=>{ProtectedFunction(()=> (user && card) && updateUserCards("favorites",card,user))}}></button> */}
                        </div>
                        
                    </div>
                    {window.innerWidth < 960 ? <></> : card?.video ? <div className="playIcon" onClick={()=>card.video && openVideoUtil(card.video.key)}></div> : <div className="playIconDisable" ></div>}
                    {/* { card?.video ? <div className="playIcon" onClick={()=>card.video && openVideoUtil(card.video.key)}></div> : <div className="playIconDisable" ></div>} */}
                </section>
                <div className="backgroundPosterDescription">
                    <img src= {`${URLValues.img_path_original}${card?.backdrop_path}`} alt={`Poste do filme ${card?.title}`} />
                </div>
            </>
        )
}
