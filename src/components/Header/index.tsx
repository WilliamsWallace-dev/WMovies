
import { Link, Outlet } from "react-router-dom"
import "../../style/style.css"
import SearchButton from "../SearchButton"
import UserButton from "../UserButton"
import { NavLink } from "react-router-dom"
import { useAuth } from "../../context/AuthProvider/useAuth"


export default function Header (){

    const {user} = useAuth()

    return(
        <>
            <header className="header flex-center flex-between">
                <div className="header-menu flex-center">
                    <div className="logo mr-5"></div>
                    <nav>
                        <ul className="menu-list flex-center">
                            <NavLink to={"/"}><li className="menu-item mr-2 p-1 px-4">Início</li></NavLink>
                            <NavLink to={"Filme"}><li className="menu-item mr-2 p-1 px-4">Filme</li></NavLink>
                            <NavLink to={"Série"}><li className="menu-item mr-2 p-1 px-4">Série</li></NavLink>
                            <NavLink to={"Anime"}><li className="menu-item mr-2 p-1 px-4">Anime</li></NavLink>
                            <Link to = {`https://www.linkedin.com/in/williams-wallace`} target = {"_blank"}><li className="menu-item mr-2 p-1 px-4">#WWallace.dev</li></Link>
                        </ul>
                    </nav>
                </div>
                <div className="header-user flex-center">
                    <NavLink className="activeSearch" to="Search"><SearchButton></SearchButton></NavLink>
                    {user && user.id ? <NavLink className="SignedIn" to = {`Profile/${user.id}`} ><UserButton signedIn = {true}></UserButton></NavLink> : <NavLink className="activeLogin" to="Login"><UserButton signedIn = {false}>Minha conta</UserButton></NavLink>}
                </div>
            </header>
            <header className="headerMobile">
                <section className="header flex-center flex-between">
                    <div className="header-menu flex-center">
                            <div className="logo"></div>
                        </div>
                        <div className="header-user flex-center">
                            <NavLink className="activeSearch" to="Search"><SearchButton></SearchButton></NavLink>
                        </div>
                </section>
                <section className="menuHeaderMobile flex-center">
                        {/* <div className="logo mr-5"></div> */}
                        <nav className="header-menu flex-center">
                            <ul className=" flex-center flex-space-around relative">
                                <NavLink to={"/"}><li className="menu-item-mobile icon-inicio p1 p-1 mx-2">Incio</li></NavLink>
                                <NavLink to={"Filme"}><li className="menu-item-mobile icon-filme p1 p-1 mr-4">Filme</li></NavLink>
                                {user && user.id ? <NavLink className="SignedIn" to = {`Profile/${user.id}`} ><li className="menu-item-main flex-center p1"><UserButton signedIn = {true}></UserButton></li></NavLink> : <NavLink className="activeLogin" to="Login"><li className="menu-item-main flex-center p1"><UserButton signedIn = {false}>Login</UserButton></li></NavLink>}
                                <NavLink to={"Série"}><li className="menu-item-mobile icon-série p1 p-1 ml-4">Série</li></NavLink>
                                <NavLink to={"Anime"}><li className="menu-item-mobile icon-anime p1 p-1 mx-2">Anime</li></NavLink>
                            </ul>
                        </nav>
                    {/* <div className="header-user flex-center">
                        <NavLink className="activeSearch" to="Search"><SearchButton></SearchButton></NavLink>
                        {user && user.id ? <NavLink className="SignedIn" to = {`Profile/${user.id}`} ><UserButton signedIn = {true}></UserButton></NavLink> : <NavLink className="activeLogin" to="Login"><UserButton signedIn = {false}>Minha conta</UserButton></NavLink>}
                    </div> */}
                </section>
            </header>
            
            <Outlet></Outlet>
        </>
    )
}