
import "../../style/style.css";
import TomHolland from "../../assets/actors/TomHolland.jpg"
import {CardType } from "../../Types";
import { URLValues } from "../../services/Api";



export default function CardMain({header ,key , cardSent} : {header? : boolean , key : number , cardSent : CardType}){

        return(
            <>
                {/* <div style={{position : "relative"}}> */}
                <section key={key} className="SwiperDescriptionItem container ">
                    <div className="desciptionPoster mr-3">
                        <img src={`${URLValues.img_path}${cardSent.poster_path}`} alt= {`Poste do Filmes : ${cardSent.title}`} />
                    </div>
                    <div className="description flex-start flex-column">
                        <h1 className="title">{cardSent.title}</h1>
                        <div className="flex-start mt-2">
                            <p className="p1 mr-3 pt-1">{cardSent.release_date.split("-")[0]}</p>
                            <p className="duration p1 mr-3">{cardSent.runtime || "2h,36min"}</p>
                            <p className="rated p1">{cardSent.vote_average}</p>
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
                            {cardSent.overview}
                        </p>
                        <div className="type flex-start mt-2">
                            {
                                cardSent.genres && cardSent.genres.map((genre)=>{
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
                {/* <div className={header ? "backgroundPoster" : "backgroundPoster " }></div> */}
                <div className= "backgroundPoster">
                    <img src= {`${URLValues.img_path_original}${cardSent.backdrop_path}`} alt={`Poste do filme ${cardSent.title}`} />
                </div>
                {/* </div> */}
            </>
        )
}