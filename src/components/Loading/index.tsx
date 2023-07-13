
// import { AppContextType } from "../../Types";
// import LoadingIcon from "../../assets/icons/loadingIcon.svg"
// import { AppContext } from "../../context/AppContext";
// import { useContext, useEffect } from "react";
// import { useAuth } from "../../context/AuthProvider/useAuth";

// export const Loading = ({children} : {children : JSX.Element})=>{

//     const  {user} = useAuth();
//     const {moviesList,seriesList,animesList,mainCards} = useContext(AppContext) as AppContextType;

//     useEffect(()=>{
//         if(!user.id)
//             console.log("to aqui")
//         if(moviesList.length == 0)
//             console.log("undefinde tambem")
//         console.log(user)
//         console.log(moviesList)
//     })

//     if(!user.id && moviesList.length == 0 && seriesList.length == 0 && animesList.length == 0)
//         return(
//             <>
//                 <div className="loadingContainer">
//                     <svg width="308" height="487" viewBox="0 0 308 487" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <g filter="url(#filter0_ddi_326_141)">
//                         <path d="M237.264 10.3066C257.625 10.3057 258.515 38.7849 237.264 41.4547C91.5543 59.7609 19.2479 170.181 29.9171 281.74C39.7065 384.099 151.84 498.902 296 463.289C159.849 506.022 31.6477 399.229 14.7773 281.74C-8.35264 120.66 117.13 14.7564 237.264 10.3066Z" fill="#E50914"/>
//                         <path d="M237.264 10.3066C257.625 10.3057 258.515 38.7849 237.264 41.4547C91.5543 59.7609 19.2479 170.181 29.9171 281.74C39.7065 384.099 151.84 498.902 296 463.289C159.849 506.022 31.6477 399.229 14.7773 281.74C-8.35264 120.66 117.13 14.7564 237.264 10.3066Z" stroke="#E50914"/>
//                         </g>
//                         <defs>
//                         <filter id="filter0_ddi_326_141" x="0" y="0.306641" width="308" height="486.594" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
//                         <feFlood flood-opacity="0" result="BackgroundImageFix"/>
//                         <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
//                         <feOffset dy="2"/>
//                         <feGaussianBlur stdDeviation="4"/>
//                         <feComposite in2="hardAlpha" operator="out"/>
//                         <feColorMatrix type="matrix" values="0 0 0 0 0.0392157 0 0 0 0 0.00392157 0 0 0 0 0.00392157 0 0 0 0.64 0"/>
//                         <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_326_141"/>
//                         <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
//                         <feOffset dy="2"/>
//                         <feGaussianBlur stdDeviation="6"/>
//                         <feComposite in2="hardAlpha" operator="out"/>
//                         <feColorMatrix type="matrix" values="0 0 0 0 0.898039 0 0 0 0 0.0352941 0 0 0 0 0.0784314 0 0 0 0.64 0"/>
//                         <feBlend mode="normal" in2="effect1_dropShadow_326_141" result="effect2_dropShadow_326_141"/>
//                         <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_326_141" result="shape"/>
//                         <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
//                         <feOffset dy="2"/>
//                         <feGaussianBlur stdDeviation="4"/>
//                         <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
//                         <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.32 0"/>
//                         <feBlend mode="normal" in2="shape" result="effect3_innerShadow_326_141"/>
//                         </filter>
//                         </defs>
//                     </svg>
//                 </div>
//             </>
//         )
//     else
//         return(
//             <>
//                 {children}
//             </>
//         )
// }





// import LoadingIcon from "../../assets/icons/loadingIcon.svg"

export const Loading = ()=>{
    return(
        <>
            <div className="loadingContainer">
                <svg width="308" height="487" viewBox="0 0 308 487" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_ddi_326_141)">
                    <path d="M237.264 10.3066C257.625 10.3057 258.515 38.7849 237.264 41.4547C91.5543 59.7609 19.2479 170.181 29.9171 281.74C39.7065 384.099 151.84 498.902 296 463.289C159.849 506.022 31.6477 399.229 14.7773 281.74C-8.35264 120.66 117.13 14.7564 237.264 10.3066Z" fill="#E50914"/>
                    <path d="M237.264 10.3066C257.625 10.3057 258.515 38.7849 237.264 41.4547C91.5543 59.7609 19.2479 170.181 29.9171 281.74C39.7065 384.099 151.84 498.902 296 463.289C159.849 506.022 31.6477 399.229 14.7773 281.74C-8.35264 120.66 117.13 14.7564 237.264 10.3066Z" stroke="#E50914"/>
                    </g>
                    <defs>
                    <filter id="filter0_ddi_326_141" x="0" y="0.306641" width="308" height="486.594" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="2"/>
                    <feGaussianBlur stdDeviation="4"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0.0392157 0 0 0 0 0.00392157 0 0 0 0 0.00392157 0 0 0 0.64 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_326_141"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="2"/>
                    <feGaussianBlur stdDeviation="6"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0.898039 0 0 0 0 0.0352941 0 0 0 0 0.0784314 0 0 0 0.64 0"/>
                    <feBlend mode="normal" in2="effect1_dropShadow_326_141" result="effect2_dropShadow_326_141"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_326_141" result="shape"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="2"/>
                    <feGaussianBlur stdDeviation="4"/>
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.32 0"/>
                    <feBlend mode="normal" in2="shape" result="effect3_innerShadow_326_141"/>
                    </filter>
                    </defs>
                </svg>
            </div>
        </>
    )
}