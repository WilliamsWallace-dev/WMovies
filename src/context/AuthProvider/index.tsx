import { createContext, useEffect, useState } from "react";
import { IContext, IUser,IAuthProvider, typeAccount, CardType } from "../../Types";
import { LoginRequest, Logout } from "./util";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { CreateUser, auth, getDocument, updateDocumentUser } from "../../services/Api";

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
                    getUserDocument(uid)
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
                    getUserDocument(uid)
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
    const getUserDocument = async (id : string)=>{
       setUser(await getDocument<IUser>("User", id))
    }
    const updateUserCards = (attribute : "favorites" | "seeLater", card : CardType,user : IUser)=>{
        if(user.favorites && attribute == "favorites"){
            if(user.favorites.find((cardfavorites)=> cardfavorites.id == card.id)){
                setUser({...user, favorites : user.favorites.filter((cardfavorites)=> cardfavorites.id != card.id) })
            }else{
                setUser({...user, favorites : [...user.favorites,card] })
            }
            updateDocumentUser("favorites",card,user)

        } else if(user.seeLater && attribute == "seeLater"){
                    if(user.seeLater.find((cardSeeLater)=> cardSeeLater.id == card.id)){
                        setUser({...user, seeLater : user.seeLater.filter((cardSeeLater)=> cardSeeLater.id != card.id) })
                    }else{
                        setUser({...user, seeLater : [...user.seeLater,card] })
                    }
                    updateDocumentUser("seeLater",card,user)
        }
        
    }

    return(
        <>
            <AuthContext.Provider value = {{
                user,
                authenticate,
                logout,
                createAccount,
                getUserDocument,
                updateUserCards
            }}>
                {children}
            </AuthContext.Provider>
        </>
    )
}