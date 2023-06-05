import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider/useAuth"

// export const ProtectedFunction = (action : ()=>void)=>{
//     const {user} = useAuth();
//     const navigate = useNavigate();

//     if(user && user.id){
//         action();
//     }else{
//         // navigate("/Login")
//         console.log("mudar login")
//     }
//     return undefined;

// }

// export const ProtectedFunction = (action : ()=>void , user : IUser | null)=>{
//     const navigate = useNavigate();

//     if(user && user.id){
//         action();
//     }else{
//         navigate("/Login")
//         // console.log("mudar login")
//     }   
// }

export const ProtecteLayout = ({children} : {children : JSX.Element})=>{

    const {user} = useAuth();

    if(user && user.id){
        return (
            <>
                {children}
            </>
        )
    }else{
        return(
            <>
            <Navigate to="/Login" replace={true}></Navigate>
            </>
        )
    }
    
}