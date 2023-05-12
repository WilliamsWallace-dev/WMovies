
import TomHolland from "../../assets/actors/TomHolland.jpg"
// import saveIcon from "../../assets/icons/saveIcon.svg"

export default function SwitchMain(){
    return(
        <>
            <section className="backgroundPoster flex-center">
                <div className="description container flex-column">
                    <h1 className="title">Homem-Aranha : No Way Home</h1>
                    <div className="flex-start mt-3">
                        <p className="p1">2022</p>
                        <p className="duration p1">2h,36min</p>
                        <p className="rated p1">7.0</p>
                    </div>
                    <p className="sinopse p1 mt-2">Peter Parker é desmascarado e não consegue mais separar sua vida normal dos grandes riscos
                        de ser um super-herói. Quando ele pede ajuda ao Doutor Estranho, os riscos se tornam ainda mais perigosos, e o forçam
                        a descobrir o que realmente significa ser o Homem-Aranha.
                    </p>
                    <div className="actors flex-start mt-2">
                        <div className="actorsItem flex-start mr-3">
                            <div className="imageActor mr-1"><img src={TomHolland} alt="TomHolland" /></div>
                            <p className="p1">Tom Holland</p>
                        </div>
                        <div className="actorsItem flex-start mr-3">
                            <div className="imageActor mr-1" ><img src={TomHolland} alt="TomHolland" /></div>
                            <p className="p1">Tom Holland</p>
                        </div>
                        <div className="actorsItem flex-start mr-3">
                            <div className="imageActor mr-1" ><img src={TomHolland} alt="TomHolland" /></div>
                            <p className="p1">Tom Holland</p>
                        </div>
                    </div>
                    <div className="type flex-start mt-2">
                        <p className="typeItem p1 mr-2">Aventura</p>
                        <p className="typeItem p1 mr-2">Ação</p>
                        <p className="typeItem p1 mr-2">Comédia</p>
                    </div>
                    <div className="buttonsDescription flex-center mt-2">
                        <button className="saveButton p2 mr-2"> Ver depois</button>
                        <button className="likeButton"></button>
                    </div>
                    
                </div>
            </section>
        </>
    )
}