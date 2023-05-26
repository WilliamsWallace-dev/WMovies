
import "../../style/style.css"
import SearchButton from "../SearchButton"
import UserButton from "../UserButton"
export default function Header (){

    
    return(
        <>
            <header className="header flex-center flex-between">
                <div className="header-menu flex-center">
                    <div className="logo mr-5"></div>
                    <nav>
                        <ul className="menu-list flex-center">
                            <li className="menu-item mr-2 p-1 px-4">Início</li>
                            <li className="menu-item mr-2 p-1 px-4">Filmes</li>
                            <li className="menu-item mr-2 p-1 px-4">Séries</li>
                            <li className="menu-item mr-2 p-1 px-4">Animes</li>
                            <li className="menu-item mr-2 p-1 px-4">Aleatório</li>
                        </ul>
                    </nav>
                </div>
                <div className="header-user flex-center">
                    <SearchButton></SearchButton>
                    <UserButton>Minha conta</UserButton>
                </div>
            </header>
        </>
    )
}