export default function videoLoader(parentContainerid, posterImg, videoSrcPath) {
    var vid = document.createElement('video')
	vid.preload = false
	vid.autoplay = false
	// vid.poster = posterImg
	// setTimeout(function (){
	// 	vid.load()
    // },4000)
    vid.src = videoSrcPath
	// vid.addEventListener('click', function () {
	// 	this.paused ? this.play() : this.pause()
	// }, false);
	vid.onended = () => {
		vid.currentTime = 0;
	}
	vid.onloadeddata = function () {
		document.getElementById(parentContainerid).innerHTML = ''
		document.getElementById(parentContainerid).appendChild(vid)


    };
    return vid
}