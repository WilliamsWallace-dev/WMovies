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
            await auth.authenticate(fields.email,fields.password)
            navigate(-1)
        }catch(error){
            console.log(error)
        }
        setFields(initialState)
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
                    
                    <div className="inputPassword mb-3">
                        <input className="" type="text" id="password" value={fields.password} onChange={handleFieldsChange}  onBlur={changeLabel} placeholder=""/>
                        <label className="" htmlFor="password">Senha</label>
                    </div>
                    <button className="FormButton" type="submit">Entrar</button>
                </form>
                <Link to="/Register"><p className=" mt-3">Não tem uma conta? <span className="p3">Cadastre-se</span></p></Link>
            </section>
        </>
    )
}