import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider/useAuth"




export const ProtectedLoginRegisteRoute = ({children} : {children : JSX.Element})=>{

    const {user} = useAuth();

    if(user && user.id){
        return(
            <>
                <Navigate to = "/" replace = {true}></Navigate>
            </>
        )
    }else{
        return(
            <>
                {children}
            </>
        )
    }
}