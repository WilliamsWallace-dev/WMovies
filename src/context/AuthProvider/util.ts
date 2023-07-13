//Firebase
import {createUserWithEmailAndPassword,signInWithEmailAndPassword   } from "firebase/auth";
import { auth } from "../../services/Api";


export const LoginRequest = async (email : string , password : string)=>{

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user)
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(`ErrorCode : ${errorCode} - ErrorMessage : ${errorMessage}`)
      });
}

export const RegisterRequest = async (email : string , password : string)=>{


    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user)
            // ...
            return user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            console.log(`ErrorCode : ${errorCode} - ErrorMessage : ${errorMessage}`)
            // ..
            return error
        });
}

export const Logout = ()=>{
    auth.signOut().
    then(()=>{
        console.log("Usuário Deslogado")
    })
    .catch((error)=> console.log(error))
}



//Uso do LocalStorage 

// export const setUserLocalStorage = (user : IUser | null)=>{
//     localStorage.setItem('u',JSON.stringify(user));
// }

// export const getUserLocalStorage = ()=>{

//     const json = localStorage.getItem('u');
//     if(!json){
//         return null;
//     }else{
//         const user = JSON.parse(json);
//         return user ?? null // Tratativa caso haja alguma string vazia...
//     }
// }