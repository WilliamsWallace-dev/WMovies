import { AuthContext } from "./index";
import {useContext } from "react";

export const useAuth = ()=>{

    const contextAuth = useContext(AuthContext)
    return contextAuth;

}