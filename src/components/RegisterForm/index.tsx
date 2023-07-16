import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AvatarImgType, IUser, IUserRegister } from "../../Types";
import { useAuth } from "../../context/AuthProvider/useAuth";

export const RegisterForm = ()=>{

    const initialState : IUserRegister = {
        username : "", password : "", checkPassword : "",email : "", avatar : {} as AvatarImgType
    }

    const [fields, setFields] = useState<IUserRegister>(initialState);

    const {createAccount} = useAuth()

    const navigate = useNavigate()

    const handleFieldsChange = (e: { currentTarget: { id: string; value: string; }; })=>{
        setFields({
            ...fields,
            [e.currentTarget.id] : e.currentTarget.value
        })
    }

    const handleSubmit = async (e: { preventDefault: () => void; })=>{
        const error = document.querySelectorAll(".Form .error");
        error.forEach((e)=>{
            e.innerHTML = ""
        })
        const label = document.querySelectorAll("label");
        // console.log(label)
        e.preventDefault()
        if(fields.username && fields.username?.length < 3){
            error[0].innerHTML = "username inválido! ( min 4 caracteres )"
        }else if(fields.checkPassword != fields.password){
            error[3].innerHTML = "Senhas diferentes!"
        }else{
            const e = await createAccount(fields as IUser)
            if(e == "auth/invalid-email"){
                error[1].innerHTML = "e-mail inválido! ( xx@xx.com )"
            }else if(e == "auth/weak-password"){
                error[2].innerHTML = "senha fraca! ( min 6 caracteres )"
            }if (e == "auth/email-already-in-use"){
                error[1].innerHTML = "e-mail já existente!"
            }else if(!e){navigate(-2)}
        }
        
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
                    <div className="inputUsername">
                        <input className="" type="text" id="username" value={fields.username} onChange={handleFieldsChange} onBlur={changeLabel}   placeholder=""/>
                        <label className="" htmlFor="username" content = "Usuário">Usuário</label>
                    </div>
                    <p className="error p5"></p>
                    <div className="inputUsername mt-2">
                        <input className="" type="text" id="email" value={fields.email} onChange={handleFieldsChange} onBlur={changeLabel} placeholder=""/>
                        <label className="" htmlFor="email" content = "E-mail">E-mail</label>
                    </div>
                    <p className="error p5"></p>
                    <div className="inputPassword mt-2">
                        <input className="" type="password" id="password" value={fields.password} onChange={handleFieldsChange} onBlur={changeLabel} placeholder=""/>
                        <label className="" htmlFor="password" content = "Senha">Senha</label>
                    </div>
                    <p className="error p5"></p>
                    <div className="inputPassword mt-2 ">
                        <input className="" type="password" id="checkPassword" value={fields.checkPassword} onChange={handleFieldsChange}  onBlur={changeLabel} placeholder=""/>
                        <label className="" htmlFor="checkPassword" content = "Repita sua senha">Repita sua senha</label>
                    </div>
                    <p className="error p5"></p>
                    
                    <button className="FormButton mt-2" type="submit">Cadastrar</button>
                </form>
                <Link to="../Login"><p className=" mt-3">Já é usuário? <span className="p3">Entre na sua conta!</span></p></Link>
            </section>
        </>
    )
}