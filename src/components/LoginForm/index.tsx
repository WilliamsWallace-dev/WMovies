import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider/useAuth";

import "../../style/style.css"

export const LoginForm = ()=>{

    const auth = useAuth()

    const initialState = {
       email : "", password : ""
    }

    const [fields, setFields] = useState({} as {email : string, password : string});
    const navigate = useNavigate();

    

    const handleFieldsChange = (e: { currentTarget: { id: string; value: string; }; })=>{
        setFields({
            ...fields,
            [e.currentTarget.id] : e.currentTarget.value
        })
        // console.log(fields)
    }

    const handleSubmit = async (e: { preventDefault: () => void; })=>{
        e.preventDefault()
        try {
            const result = await auth.authenticate(fields.email,fields.password)
            if(result) throw result
            navigate(-1)
        }catch(error){
            console.log(error)
            const err = document.querySelector(".Form .error");
            err ? error == "auth/user-not-found" ? err.innerHTML = "Usuário não existente" : err.innerHTML = "E-mail / Senha inválido" : ""
        }
        setFields(initialState)
        document.querySelectorAll(".Form label").forEach((e,index)=>{
            index == 0 ? e.innerHTML = "E-mail" : e.innerHTML = "Senha"
        })
    }

    const changeLabel = (e : any)=>{
        const label = e.currentTarget.parentNode.querySelector("label") ;

        if(label.getAttribute("for") == "email"){
            if(fields.email != "")
                label.innerHTML = ""
            else {
                label.innerHTML = "E-mail"
            }
        }else if(label.getAttribute("for") == "password"){
                if(fields.password != "")
                    label.innerHTML = ""
                else {
                    label.innerHTML = "Senha"
                }
            }        
    }

    return(
        <>
            <section className="Form flex-center flex-column ">
                <h1 className="">Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="inputUsername mb-2">
                        <input className="" type="text" id="email" value={fields.email} onChange={handleFieldsChange} onBlur={changeLabel}   placeholder=""/>
                        <label className="" htmlFor="email">E-mail</label>
                    </div>
                    
                    <div className="inputPassword mb-1">
                        <input className="" type="password" id="password" value={fields.password} onChange={handleFieldsChange}  onBlur={changeLabel} placeholder=""/>
                        <label className="" htmlFor="password">Senha</label>
                    </div>
                    <p className="error p5"></p>
                    <button className="FormButton mt-1" type="submit">Entrar</button>
                </form>
                <Link to="/Register"><p className=" mt-3">Não tem uma conta? <span className="p3">Cadastre-se</span></p></Link>
            </section>
        </>
    )
}