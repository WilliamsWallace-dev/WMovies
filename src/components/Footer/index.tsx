import { Link, Outlet } from "react-router-dom"



export const Footer = ()=>{
    return(
        <>
            <section className="footerContainer flex-center mt-5">
            <div className="flex-center flex-space-around pb-2 w-100">
                <div className="logo mr-5"></div>
                <p className="p1 pt-2">Williams Wallace © 2023 Todos Os Direitos Reservados.</p>
                <div className="flex-center">
                    <Link to = {`https://www.instagram.com/williamswallace_/`}  target="_blank"><div className="iconInstagram mr-2"></div></Link>
                    <Link to = {`https://www.linkedin.com/in/williams-wallace`}  target="_blank"><div className="iconLinkedIn mr-2" ></div></Link>
                    <Link to = {`https://github.com/WilliamsWallace-dev`}  target="_blank"><div className="iconGitHub"></div></Link>
                </div>
            </div>
            
    
            </section>
        </>
    )
}