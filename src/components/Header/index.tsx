
import "../../style/style.css"
import SearchButton from "../SearchButton"
import UserButton from "../UserButton"
export default function Header (){

    
    return(
        <>
            <header className="header flex-center flex-between">
                <div className="header-menu flex-center">
                    <div className="logo mr-4"></div>
                    <nav>
                        <ul className="menu-list flex-center">
                            <li className="menu-item mr-2 p-1 pr-2">Início</li>
                            <li className="menu-item mr-2 p-1 pr-2">Filmes</li>
                            <li className="menu-item mr-2 p-1 pr-2">Séries</li>
                            <li className="menu-item mr-2 p-1 pr-2">Animes</li>
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