import { createContext, useEffect, useState } from "react";
import { IContext, IUser,IAuthProvider, typeAccount } from "../../Types";
import { LoginRequest, Logout } from "./util";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { CreateUser, auth } from "../../services/Api";

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider = ({children} : IAuthProvider) =>{

    const [user, setUser] = useState<IUser>({} as IUser)

    useEffect(()=>{
        
        auth.signOut().
        then(()=>{
            console.log("Usuário Deslogado")
            setUser({} as IUser)
        })
        .catch((error)=> console.log(error))

        onAuthStateChanged(auth, (userOn) => {
            if (userOn) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = userOn.uid;
                const uemail = userOn.email
                if(uid == "uJqqGNTncHPWRHcC3tvivS0R1dX2" && uemail){
                    setUser({...user,id : uid,typeOfAccount : typeAccount.admin, email : uemail})
                }else if(uid && uemail){
                    setUser({...user,id : uid,typeOfAccount : typeAccount.user, email : uemail})
                }
                
                // ...
            } else {
                // User is signed out
                // ...
                console.log("User is signed out")
            }
            });

    },[])

    const authenticate = async (email : string ,password : string)=>{
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const userOn = userCredential.user;
                const uid = userOn.uid;
                const uemail = userOn.email
                if(uid == "uJqqGNTncHPWRHcC3tvivS0R1dX2" && uemail){
                    setUser({...user,id : uid,typeOfAccount : typeAccount.admin, email : uemail})
                }else if(uid && uemail){
                    setUser({...user,id : uid,typeOfAccount : typeAccount.user, email : uemail})
                }
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
  
                console.log(`ErrorCode : ${errorCode} - ErrorMessage : ${errorMessage}`)
            });
    }

    const logout = ()=>{
        auth.signOut().
        then(()=>{
            // console.log("Usuário Deslogado")
            setUser({} as IUser)
        })
        .catch((error)=> console.log(error))
    }

    const createAccount = (userCreated : IUser)=>{
        CreateUser(userCreated)
    }

    return(
        <>
            <AuthContext.Provider value = {{
                user,
                authenticate,
                logout,
                createAccount
            }}>
                {children}
            </AuthContext.Provider>
        </>
    )
}