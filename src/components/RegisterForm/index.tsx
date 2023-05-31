import { useState } from "react";
import { Link } from "react-router-dom";
import { IUserRegister } from "../../Types";

export const RegisterForm = ()=>{

    const initialState : IUserRegister = {
        username : "", password : "", checkPassword : ""
    }

    const [fields, setFields] = useState<IUserRegister>(initialState);

    const handleFieldsChange = (e: { currentTarget: { id: string; value: string; }; })=>{
        setFields({
            ...fields,
            [e.currentTarget.id] : e.currentTarget.value
        })
        console.log(fields)
    }

    const handleSubmit = (e: { preventDefault: () => void; })=>{
        e.preventDefault()
        setFields(initialState)
    }

    const changeLabel = (e : any)=>{
        const label = e.currentTarget.parentNode.querySelector("label") ;
        
        console.log(label.getAttribute("for") )
        if(label.getAttribute("for") == "username"){
            if(fields.username != "")
                label.innerHTML = ""
            else {
                label.innerHTML = "Usuário"
                return 0
            }
            }else if(label.getAttribute("for") == "email"){
                if(fields.email != "")
                label.innerHTML = ""
            else {
                label.innerHTML = "E-mail"
                return 0
            }
                }else if(label.getAttribute("for") == "password"){
                                if(fields.password != "")
                                label.innerHTML = ""
                            else {
                                label.innerHTML = "Senha"
                                return 0
                            }
                    }else if(label.getAttribute("for") == "checkPassword"){
                                if(fields.checkPassword != "")
                                label.innerHTML = ""
                            else {
                                label.innerHTML = "Repita sua senha"
                                return 0
                            }
                        }
                    
            
        
        
    }

    return(
        <>
            <section className="Form flex-center flex-column mx-2 ">
                <form onSubmit={handleSubmit}>
                    <h1 className="">Registre-se</h1>
                    <div className="inputUsername mb-2">
                        <input className="" type="text" id="username" value={fields.username} onChange={handleFieldsChange} onBlur={changeLabel}   placeholder=""/>
                        <label className="" htmlFor="username">Usuário</label>
                    </div>
                    <div className="inputUsername mb-2">
                        <input className="" type="text" id="email" value={fields.email} onChange={handleFieldsChange}  onBlur={changeLabel} placeholder=""/>
                        <label className="" htmlFor="email">E-mail</label>
                    </div>
                    <div className="inputPassword mb-2">
                        <input className="" type="password" id="password" value={fields.password} onChange={handleFieldsChange}  onBlur={changeLabel} placeholder=""/>
                        <label className="" htmlFor="password">Senha</label>
                    </div>
                    <div className="inputPassword mb-3">
                        <input className="" type="password" id="checkPassword" value={fields.checkPassword} onChange={handleFieldsChange}  onBlur={changeLabel} placeholder=""/>
                        <label className="" htmlFor="checkPassword">Repita sua senha</label>
                    </div>
                    
                    <button className="FormButton" type="submit">Entrar</button>
                </form>
                <Link to="../Login"><p className=" mt-3">Já é usuário? <span className="p3">Entre na sua conta!</span></p></Link>
            </section>
        </>
    )
}