
import { ReactNode } from "react"
import "../../style/style.css";
import TomHolland from "../../assets/actors/TomHolland.jpg"
import SpiderManDescriptionPoster from "../../assets/descriptionPosters/SpiderMan.jpg"

export default function SwiperDescriptionItem({children} : {children? : ReactNode}){

        return(
            <>
                {/* <div style={{position : "relative"}}> */}
                {children}
                <section className="SwiperDescriptionItem container ">
                    <div className="desciptionPoster mr-3">
                        <img src={SpiderManDescriptionPoster} alt="SpiderManDescriptionPoster" />
                    </div>
                    <div className="description flex-start flex-column">
                        <h1 className="title">Homem-Aranha : No Way Home</h1>
                        <div className="flex-start mt-2">
                            <p className="p1 mr-3 pt-1">2022</p>
                            <p className="duration p1 mr-3">2h,36min</p>
                            <p className="rated p1">7.0</p>
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
                        <p className="sinopse text-left p1 mt-2">Peter Parker é desmascarado e não consegue mais separar sua vida normal dos grandes riscos
                            de ser um super-herói. Quando ele pede ajuda ao Doutor Estranho, os riscos se tornam ainda mais perigosos, e o forçam
                            a descobrir o que realmente significa ser o Homem-Aranha.
                        </p>
                        <div className="type flex-start mt-2">
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
                    <img src="https://images2.alphacoders.com/117/thumb-1920-1170277.jpg" alt="SpiderManPoster" />
                </div>
                {/* </div> */}
            </>
        )
}