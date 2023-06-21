


// const Profile = ()=>{


//     const  {user,logout} = useAuth();
//     // console.log(user)

//     const [search,setSearch] = useState({text : "", cards : []} as Search) ;

//     const [feature,setFeature] = useState({typeContent : "Filme",typeOp : "Gerenciar"} as TypeSearch)

//     const {moviesList,seriesList,animesList} = useContext(AppContext)

//     const handleFieldsChange = (e : {currentTarget : {value : string}})=>{
//         setSearch({...search, text : e.currentTarget.value})
//     }

//     const changeLabel = (e : any)=>{
//         const label = e.currentTarget.parentNode.querySelector("label") ;
//         console.log(label)

//             if(search.text != "")
//                 label.innerHTML = ""
//             else {
//                 label.innerHTML = "Digite o Título do Filmes, Serie..."
//             }  
//     }


//     const itensPerPage = 15;
//     const [currentPage,setCurrentPage] = useState(0)

//     return(
//         <>
        
//         </>
//     )
// }