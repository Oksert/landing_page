export default {
    customizeVideo:customizeVideo
}
function customizeVideo (vidContainerObj) {
    let {parentSection, allControls,  pauseControl, playControl,video} = vidContainerObj
    $(parentSection).mouseenter(()=>{
		video.paused?$(playControl).fadeIn():$(pauseControl).fadeIn()
	}).mouseleave(()=>{
		$(allControls).fadeOut()
    })
    setPause(pauseControl,video)
    setPlay(playControl,video)

}
function setPause(pauseControl,video) {
    $(pauseControl).click(()=>{
        video.pause()
        $(pauseControl).fadeOut()
    })
}
function setPlay(playControl,video) {
    $(playControl).click(()=>{
        video.play()
        $(playControl).fadeOut()
    })
}