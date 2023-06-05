import "../../style/style.css";



export default function UserButton ({children, signedIn} : {children? : string, signedIn : boolean }){
    return(
        <>
            {signedIn ? <button className="signedInButton">{children}</button> : <button className="userButton p4">{children}</button>}
            
        </>
    )
}