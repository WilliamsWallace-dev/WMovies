export const openVideoUtil = (videoKey : string) => {
    const videoElement = document.querySelector(".videoContainer")
    videoElement && videoElement.classList.remove("videoContainerDisable")
    videoElement?.querySelector("iframe")?.setAttribute("src",`https://www.youtube.com/embed/${videoKey}`)

}
export const closeVideoUtil = ()=>{
    const videoElement = document.querySelector(".videoContainer")
    videoElement && videoElement.classList.add("videoContainerDisable")
    videoElement?.querySelector("iframe")?.setAttribute("src",`https://www.youtube.com/embed/`)
}