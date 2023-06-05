import { useState } from "react";
import { typeAccount } from "../../Types";
import { useAuth } from "../../context/AuthProvider/useAuth"


export const Profile = ()=>{

    const  {user} = useAuth();

    const [search,setSearch] = useState("");

    const handleFieldsChange = (e : {currentTarget : {value : string}})=>{
        setSearch(e.currentTarget.value)
    }

    const changeLabel = (e : any)=>{
        const label = e.currentTarget.parentNode.querySelector("label") ;

        if(label.getAttribute("for") == "search"){
            if(search != "")
                label.innerHTML = ""
            else {
                label.innerHTML = "Digite o Título do Filmes, Serie..."
            }  
        }
    }

    // const openMenuOption = (e)=>{
    //     const options = e.querySelector(".menu-options");
    //     options.classList.toggle("active");
    // }

    if(user && user.typeOfAccount == typeAccount.admin){
    return(
        <>
            <section className="Admin flex-column">
                <div className="UserInf">
                    <p className="typeOfAccount">Usuário</p>
                    <h1>Williams Wallace</h1>
                </div>
                <div className="featuresAdmin flex-center flex-column">
                        <ul className="menu-list flex-center mb-4">
                                <li className="menu-item flex-center flex-column mr-4" >
                                    <h3 className="">Filmes</h3>
                                    <ul className="menu-options flex-center">
                                            <li className="mr-2">Gerenciar</li>
                                            <li>Adicionar</li>
                                    </ul>
                                </li>
                                <li className="menu-item flex-center flex-column mr-4" >
                                    <h3 className="">Séries</h3>
                                    <ul className="menu-options flex-center">
                                            <li className="mr-2">Gerenciar</li>
                                            <li>Adicionar</li>
                                    </ul>
                                </li>
                                <li className="menu-item flex-center flex-column" >
                                    <h3 className="">Animes</h3>
                                    <ul className="menu-options flex-center">
                                            <li className="mr-2">Gerenciar</li>
                                            <li>Adicionar</li>
                                    </ul>
                                </li>
                                
                                
                        </ul>
                        <div className="inputSearch">
                            <input className="" type="text" id="search" value={search} onChange={handleFieldsChange}  onBlur={changeLabel} placeholder=""/>
                            <label className="" htmlFor="search">Digite o Título do Filmes, Serie...</label>
                        </div>
                        
                </div>
                
            </section>
            
        </>
    )
    }else return(
        <>
        
        </>
    )
}