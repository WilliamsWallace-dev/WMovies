import "../../style/style.css"

export default function SwiperListItem(){
    return(
        <>
            <section className="SwiperListItem flex-center flex-column">
                        <div className="sinopseHover px-1">
                            <p className="p5" style={{opacity : ".64"}} >Sinopse</p>
                                <p>
                                    Peter Parker é desmascarado e não consegue mais separar sua vida normal dos grandes riscos
                                    de ser um super-herói. Quando ele pede ajuda ao Doutor Estranho, os riscos se tornam ainda mais perigosos, e o forçam
                                    a descobrir o que realmente significa ser o Homem-Aranha.
                                </p>
                        </div>
                        <p className="titleListItem p5 px-1">Homem-Aranha : No Way Home</p>
                        <div className="descriptionListItem flex-start mb-2">
                            <p className="p5 mr-2">2022</p>
                            <p className="duration p5 mr-2 ">2h,36min</p>
                            <p className="rated p5">7.0</p>
                        </div>
                        <div className="backgroundListItem"><img src="https://www.mordeo.org/files/uploads/2021/12/Spider-Man-Explosion-No-Way-Home-4K-Ultra-HD-Mobile-Wallpaper.jpg" alt="" /></div>
            </section>
        </>
    )
}



//Descrição sem Sinopse
<p className="sinopseHover px-1">
    Peter Parker é desmascarado e não consegue mais separar sua vida normal dos grandes riscos
    de ser um super-herói. Quando ele pede ajuda ao Doutor Estranho, os riscos se tornam ainda mais perigosos, e o forçam
    a descobrir o que realmente significa ser o Homem-Aranha.
</p>