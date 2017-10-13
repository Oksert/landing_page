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
function setPause(pauseControl,video, playControl) {
    $(pauseControl).click(()=>{
        video.pause()
        $(pauseControl).hide()
        // setTimeout(()=>$(playControl).fadeIn())
        $(playControl).show()
    })
}
function setPlay(playControl,video, pauseControl) {
    $(playControl).click(()=>{
        video.play()
        $(playControl).hide()
        // setTimeout(()=>$(pauseControl).fadeIn())
        $(pauseControl).show()
    })
}