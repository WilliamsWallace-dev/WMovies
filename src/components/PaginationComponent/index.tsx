
export const PaginationComponent = ({pages,setCurrentPage,currentPage} : {pages : number,setCurrentPage : React.Dispatch<React.SetStateAction<number>>, currentPage : number} )=>{
    return(
        <>
            <div className="pages mt-2">
                {Array.from(Array(pages), (item,index)=>{
                    return <button className= {currentPage == index ? "paginationButton p1 mr-2 active" : "paginationButton p1 mr-2"} value = {index} onClick = {(e)=> setCurrentPage(Number(e.currentTarget.value)) }>{index+1}</button>
                })}
            </div>
        </>
    )
}