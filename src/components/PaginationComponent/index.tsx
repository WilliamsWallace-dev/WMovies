import { ScrollToTop } from "../ScrollToTop"

export const PaginationComponent = ({pages,setCurrentPage,currentPage} : {pages : number,setCurrentPage : React.Dispatch<React.SetStateAction<number>>, currentPage : number} )=>{
    
    return(
        <>  
             {/* <ScrollToTop currentPage={currentPage}></ScrollToTop>
            <div className="pages my-3">
                {currentPage > 0 && pages && <button className="paginationControllLeft p1 mr-2" onClick = {()=> setCurrentPage(currentPage-1)}>&larr;</button>}
                {Array.from(Array(pages), (item,index)=>{
                    return <Link to = {`${url}${index+1}`}><button className= {currentPage == index && !item ? "paginationButton p1 mx-1 my-1 active" : "paginationButton p1 mx-1 my-1"} value = {index} onClick = {(e)=> setCurrentPage(Number(e.currentTarget.value)) }>{index+1}</button></Link>
                })}
                {currentPage+1 < pages && <button className="paginationControllRight p1 ml-2" onClick = {()=> setCurrentPage(currentPage+1)}>&rarr;</button>}
            </div> */}
            <ScrollToTop currentPage={currentPage} setCurrentPage={setCurrentPage}></ScrollToTop>
            <div className="pages my-3">
                {currentPage > 0 && pages && <button className="paginationControllLeft p1 mr-2" onClick = {()=> setCurrentPage(currentPage-1)}>&larr;</button>}
                {Array.from(Array(pages), (item,index)=>{
                    return <button className= {currentPage == index && !item ? "paginationButton p1 mx-1 my-1 active" : "paginationButton p1 mx-1 my-1"} value = {index} onClick = {(e)=> setCurrentPage(Number(e.currentTarget.value)) }>{index+1}</button>
                })}
                {currentPage+1 < pages && <button className="paginationControllRight p1 ml-2" onClick = {()=> setCurrentPage(currentPage+1)}>&rarr;</button>}
            </div>
        </>
    )
}



// export const PaginationComponent = ({pages,setCurrentPage,currentPage} : {pages : number,setCurrentPage : React.Dispatch<React.SetStateAction<number>>, currentPage : number} )=>{
//     return(
//         <>
//             <div className="pages my-3">
//                 {currentPage > 0 && pages && <button className="paginationControllLeft p1 mr-2" onClick = {()=> setCurrentPage(currentPage-1)}>&larr;</button>}
//                 {Array.from(Array(pages), (item,index)=>{
//                     return <button className= {currentPage == index ? "paginationButton p1 mx-1 active" : "paginationButton p1 mx-1"} value = {index} onClick = {(e)=> setCurrentPage(Number(e.currentTarget.value)) }>{index+1}</button>
//                 })}
//                 {currentPage+1 < pages && <button className="paginationControllRight p1 ml-2" onClick = {()=> setCurrentPage(currentPage+1)}>&rarr;</button>}
//             </div>
//         </>
//     )
// }