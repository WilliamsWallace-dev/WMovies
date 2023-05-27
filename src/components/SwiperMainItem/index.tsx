
import { ReactNode } from "react"
import "../../style/style.css";
import TomHolland from "../../assets/actors/TomHolland.jpg"
import SpiderManDescriptionPoster from "../../assets/descriptionPosters/SpiderMan.jpg"
import { MovieType } from "../../Types";
import { URLValues } from "../../services/Api";

export default function SwiperDescriptionItem({children , key , movie} : {children? : ReactNode , key : number , movie : MovieType}){

        return(
            <>
                {/* <div style={{position : "relative"}}> */}
                {children}
                <section className="SwiperDescriptionItem container ">
                    <div className="desciptionPoster mr-3">
                        <img src={`${URLValues.img_path}${movie.poster_path}`} alt="SpiderManDescriptionPoster" />
                    </div>
                    <div className="description flex-start flex-column">
                        <h1 className="title">{movie.title}</h1>
                        <div className="flex-start mt-2">
                            <p className="p1 mr-3 pt-1">{movie.release_date.split("-")[0]}</p>
                            <p className="duration p1 mr-3">{movie.runtime || "2h,36min"}</p>
                            <p className="rated p1">{movie.vote_average}</p>
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
                            {movie.overview}
                        </p>
                        <div className="type flex-start mt-2">
                            {
                                movie.genres && movie.genres.map((genre)=>{
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
                <div className={children ? "backgroundPoster height100vh" : "backgroundPoster height100 " }>
                    <img src= {`${URLValues.img_path_original}${movie.backdrop_path}`} alt={`Poste do filme ${movie.title}`} />
                </div>
                {/* </div> */}
            </>
        )
}