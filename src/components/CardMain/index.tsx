
// import "../../style/style.css";
// import TomHolland from "../../assets/actors/TomHolland.jpg"
// import {CardType } from "../../Types";
// import { URLValues } from "../../services/Api";



// export default function CardMain({header ,key , card} : {header? : boolean , key : number , card : CardType}){

//         return(
//             <>
//                 {/* <div style={{position : "relative"}}> */}
//                 <section key={key} className="SwiperDescriptionItem container ">
//                     <div className="desciptionPoster mr-3">
//                         <img src={`${URLValues.img_path}${card.poster_path}`} alt= {`Poste do Filmes : ${card.title}`} />
//                     </div>
//                     <div className="description flex-start flex-column align-items-flex-start">
//                         <h1 className="title">{card.name || card.title}</h1>
//                         <div className="flex-start mt-2">
//                             {card.first_air_date || card.release_date ? <p className="p1 mr-3 pt-1">{card.first_air_date ? card.first_air_date.split('-')[0] : card.release_date.split('-')[0]}</p> : <></> }
//                             <p className="duration p1 mr-3">{card.runtime || "2h,36min"}</p>
//                             <p className="rated p1">{card.vote_average}</p>
//                         </div>
//                         <div className="actors flex-start mt-2">
//                             <div className="actorsItem flex-start mr-3">
//                                 <div className="imageActor mr-1"><img src={TomHolland} alt="TomHolland" /></div>
//                                 <p className="p2">Tom Holland</p>
//                             </div>
//                             <div className="actorsItem flex-start mr-3">
//                                 <div className="imageActor mr-1" ><img src={TomHolland} alt="TomHolland" /></div>
//                                 <p className="p2">Tom Holland</p>
//                             </div>
//                             <div className="actorsItem flex-start mr-3">
//                                 <div className="imageActor mr-1" ><img src={TomHolland} alt="TomHolland" /></div>
//                                 <p className="p2">Tom Holland</p>
//                             </div>
//                         </div>
//                         <p className="sinopse text-left p1 mt-2">
//                             {card.overview}
//                         </p>
//                         <div className="type flex-start mt-2">
//                             {
//                                 card.genres && card.genres.map((genre)=>{
//                                     return(
//                                         <>
//                                             <p className="typeItem p2 mr-2">{genre.name}</p>
//                                         </>
//                                     )
//                                 })
//                             }
//                             <p className="typeItem p2 mr-2">Aventura</p>
//                             <p className="typeItem p2 mr-2">Ação</p>
//                             <p className="typeItem p2 mr-2">Comédia</p>
//                         </div>
//                         <div className="buttonsDescription flex-center mt-2">
//                             <button className="saveButton p3 mr-2"> Ver depois</button>
//                             <button className="likeButton"></button>
//                         </div>
                        
//                     </div>
//                     <div className="playIcon"></div>
//                 </section>
//                 {/* <div className={header ? "backgroundPoster" : "backgroundPoster " }></div> */}
//                 <div className= "backgroundPoster">
//                     <img src= {`${URLValues.img_path_original}${card.backdrop_path}`} alt={`Poste do filme ${card.title}`} />
//                 </div>
//                 {/* </div> */}
//             </>
//         )
// }










////////////////////

///////////////////////////////////////////




import "../../style/style.css";
import {CardType } from "../../Types";
import { URLValues } from "../../services/Api";
import { Link } from "react-router-dom";



export default function CardMain({header ,key , card} : {header? : boolean , key : number , card : CardType}){

        return(
            <>
                {/* <div style={{position : "relative"}}> */}
                <section key={key} className={header ? "CardMain SwiperDescriptionItem flex-center flex-column " : "SwiperDescriptionItem flex-center flex-column "}>
                    <div className="descriptionLogo mr-3">
                        <img src={`${URLValues.img_path_original}${card.logo}`} alt= {`Poste do Filmes : ${card.title}`} />
                    </div>
                    <div className="description flex-center flex-column">
                        <div className="flex-start mt-2">
                            {card.first_air_date || card.release_date ? <p className="p1 mr-3 pt-1">{card.first_air_date ? card.first_air_date.split('-')[0] : card.release_date.split('-')[0]}</p> : <></> }
                            {card.runtime ? <p className="duration p5 mr-2 ">{`${Math.floor(card.runtime/60)}h,${(card.runtime%60)}min`}</p> : <p className="duration p5 mr-2 ">{card.number_of_seasons > 1 ? `${card.number_of_seasons} Temporadas` : `${card.number_of_seasons} Temporada`}</p>}
                            <p className="rated p5">{card.vote_average.toFixed(1)}</p>
                        </div>
                        <p className="sinopse p1 mt-1">
                            {window.innerWidth < 540 ? card.overview.length < 200 ? card.overview : `${card.overview.split(".")[0]}...` : card.overview.length < 320 ? card.overview : `${card.overview.split(".")[0]}.${card.overview.split(".")[1]}... `}
                            {/* {card.overview.length < 320 ? card.overview : `${card.overview.split(".")[0]}... `} */}
                        </p>
                        <Link to={`../${card.typeContent}/${card.id}` }><button className="second-button buttonIconPlay mt-2">ver mais</button></Link>
                    </div>
                </section>
                {/* <div className={header ? "backgroundPoster" : "backgroundPoster " }></div> */}
                <div className= {header ? "backgroundPoster" : "backgroundPosterDescription"}>
                    <img src= {`${URLValues.img_path_original}${card.backdrop_path}`} alt={`Poste do filme ${card.title}`} />
                </div>
                {/* </div> */}
            </>
        )
}