import "../../style/style.css";



export default function SearchButton ({children} : {children? : string}){
    return(
        <>
            <button className="searchButton p5 mr-2">{children}</button>
            
        </>
    )
}