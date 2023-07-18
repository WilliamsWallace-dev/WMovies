import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToTop = ({currentPage, setCurrentPage}: {currentPage? : number, setCurrentPage? : React.Dispatch<React.SetStateAction<number>>})=>{
    const {pathname} = useLocation();

    useEffect(()=>{
        window.scrollTo(0,0);
    },[pathname,currentPage])

    useEffect(()=>{
        setCurrentPage && setCurrentPage(0)
    },[pathname])


    
    return (
        <></>
    )
}