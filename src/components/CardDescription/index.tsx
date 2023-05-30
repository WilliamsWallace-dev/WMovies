
import { ReactNode, useEffect, useState, useContext } from "react"
import "../../style/style.css";
import TomHolland from "../../assets/actors/TomHolland.jpg"
import { AppContextType, CardType, TypeContent } from "../../Types";
import { URLValues } from "../../services/Api";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";



export default function CardDescription(){

    const {moviesList,seriesList,animesList} = useContext(AppContext) as AppContextType;

    const [card,setCard] = useState <CardType>()

    const {typeContent = "Filmes",id = "0"} = useParams<{typeContent : string , id : string}>();

    useEffect(()=>{

        switch (typeContent) {
            case TypeContent.Filmes : 
                setCard(moviesList?.results.find(movie => movie.id == parseInt(id)))
                break;
            case TypeContent.Series : 
                setCard(seriesList?.results.find(serie => serie.id == parseInt(id)))
                break;
            case TypeContent.Animes : 
                setCard(animesList?.results.find(anime => anime.id == parseInt(id)))
                break;
        }
    },[moviesList,seriesList,animesList,id])

        return(
            <>
                {/* <div style={{position : "relative"}}> */}
                <section className="SwiperDescriptionItem container DescritionCard ">
                    <div className="desciptionPoster mr-3">
                        <img src={`${URLValues.img_path}${card?.poster_path}`} alt="SpiderManDescriptionPoster" />
                    </div>
                    <div className="description flex-start flex-column">
                        <h1 className="title">{card?.title}</h1>
                        <div className="flex-start mt-2">
                            <p className="p1 mr-3 pt-1">{card?.release_date.split("-")[0]}</p>
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
                            <button className="saveButton p3 mr-2"> Ver depois</button>
                            <button className="likeButton"></button>
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