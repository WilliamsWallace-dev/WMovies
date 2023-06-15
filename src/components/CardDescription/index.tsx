
import { ReactNode, useEffect, useState, useContext } from "react"
import "../../style/style.css";
import TomHolland from "../../assets/actors/TomHolland.jpg"
import { AppContextType, CardType, TypeContent } from "../../Types";
import { URLValues } from "../../services/Api";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

import { useAuth } from "../../context/AuthProvider/useAuth";



export default function CardDescription(){

    const {moviesList,seriesList,animesList} = useContext(AppContext) as AppContextType;

    const [card,setCard] = useState <CardType>()

    const {typeContent = "Filmes",id = "0"} = useParams<{typeContent : string , id : string}>();

    const {user} = useAuth();
    const navigate = useNavigate();

    useEffect(()=>{

        switch (typeContent) {
            case TypeContent.Filmes : 
                setCard(moviesList?.find(movie => movie.id == parseInt(id)))
                break;
            case TypeContent.Series : 
                setCard(seriesList?.find(serie => serie.id == parseInt(id)))
                break;
            case TypeContent.Animes : 
                setCard(animesList?.find(anime => anime.id == parseInt(id)))
                break;
        }
    },[moviesList,seriesList,animesList,id])

    const ProtectedFunction = (action : ()=>void)=>{
        if(user && user.id){
            action();
        }else{
            navigate("/Login")
            // console.log("mudar login")
        }   
    }

        return(
            <>
                {/* <div style={{position : "relative"}}> */}
                <section className="SwiperDescriptionItem container ">
                    <div className="desciptionPoster mr-3">
                        <img src={`${URLValues.img_path}${card?.poster_path}`} alt= {`Poste do Filmes : ${card?.name || card?.title}`} />
                    </div>
                    <div className="description flex-start flex-column">
                        <h1 className="title">{card?.name || card?.title}</h1>
                        <div className="flex-start mt-2">
                            {card?.first_air_date || card?.release_date ? <p className="p1 mr-3 pt-1">{card?.first_air_date ? card?.first_air_date.split('-')[0] : card?.release_date.split('-')[0]}</p> : <></> }
                            <p className="duration p1 mr-3">{card?.runtime || "2h,36min"}</p>
                            <p className="rated p1">{card?.vote_average}</p>
                        </div>
                        <div className="actors flex-start mt-2">
                            <div className="actorsItem flex-start mr-3">
                                <div className="imageActor mr-1"><img src={TomHolland} alt="TomHolland" /></div>
                                <p className="p2">Tom Holland</p>
                            </div>
                            <div className="actorsItem flex-start mr-3">
                                <div className="imageActor mr-1" ><img src={TomHolland} alt="TomHolland" /></div>
                                <p className="p2">Tom Holland</p>
                            </div>
                            <div className="actorsItem flex-start mr-3">
                                <div className="imageActor mr-1" ><img src={TomHolland} alt="TomHolland" /></div>
                                <p className="p2">Tom Holland</p>
                            </div>
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
                            <p className="typeItem p2 mr-2">Aventura</p>
                            <p className="typeItem p2 mr-2">Ação</p>
                            <p className="typeItem p2 mr-2">Comédia</p>
                        </div>
                        <div className="buttonsDescription flex-center mt-2">
                            <button className="saveButton p3 mr-2" onClick= {()=>{ProtectedFunction(()=>console.log("likeButton"))}}> Ver depois</button>
                            <button className="likeButton" onClick= {()=>{ProtectedFunction(()=>console.log("likeButton"))}}></button>
                        </div>
                        
                    </div>
                    <div className="playIcon"></div>
                </section>
                <div className="backgroundPoster">
                    <img src= {`${URLValues.img_path_original}${card?.backdrop_path}`} alt={`Poste do filme ${card?.title}`} />
                </div>
                {/* </div> */}
            </>
        )
}