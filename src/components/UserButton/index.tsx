import "../../style/style.css";



export default function UserButton ({children} : {children? : string}){
    return(
        <>
            <button className="userButton p4">{children}</button>
            
        </>
    )
}