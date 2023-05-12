import "../../style/style.css";



export default function UserButton ({children} : {children? : string}){
    return(
        <>
            <button className="userButton p5">{children}</button>
            
        </>
    )
}