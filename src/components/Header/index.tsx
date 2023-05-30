
import { Outlet } from "react-router-dom"
import "../../style/style.css"
import SearchButton from "../SearchButton"
import UserButton from "../UserButton"
import { NavLink } from "react-router-dom"
export default function Header (){

    
    return(
        <>
            <header className="header flex-center flex-between">
                <div className="header-menu flex-center">
                    <div className="logo mr-5"></div>
                    <nav>
                        <ul className="menu-list flex-center">
                            <NavLink to={"/"}><li className="menu-item mr-2 p-1 px-4">Início</li></NavLink>
                            <NavLink to={"Filmes/"}><li className="menu-item mr-2 p-1 px-4">Filmes</li></NavLink>
                            <NavLink to={"Séries/"}><li className="menu-item mr-2 p-1 px-4">Séries</li></NavLink>
                            <NavLink to={"Anime/"}><li className="menu-item mr-2 p-1 px-4">Animes</li></NavLink>
                            <NavLink to={"Sobre/"}><li className="menu-item mr-2 p-1 px-4">Sobre</li></NavLink>
                        </ul>
                    </nav>
                </div>
                <div className="header-user flex-center">
                    <SearchButton></SearchButton>
                    <UserButton>Minha conta</UserButton>
                </div>
            </header>
            <Outlet></Outlet>
        </>
    )
}