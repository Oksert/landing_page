import './styles/common.scss'
import './styles/desctop.scss'
import './styles/medium.scss'
// import './styles/small.scss'
import './styles/mobile.scss'
import setControls from './src/video-control-custom'
import fullPage from './src/fullPageSetup'
import videoLoader from './src/video-loader'

$(document).ready(function () {

	$('form').submit(function (event) {

		// get the form data
		// there are many ways to get this data using jQuery (you can use the class or id also)
		var formData = objectifyForm(($('#modalBox form').serializeArray()))
		let userAction = []
		$('#modalBox input[useraction]').each((idx,val)=>{
			if (val.checked) {
				userAction.push(val.attributes.useraction.value)
			}
		})
		console.log(userAction)
		// process the form
		$.ajax({
			type: 'post', // define the type of HTTP verb we want to use (POST for our form)
			url: 'http://194.87.111.90/clientregistration', // the url where we want to POST
			contentType: "application/x-www-form-urlencoded",
			data: Object.assign(formData, {action:userAction.join(';')}), // our data object
			// dataType: 'json', // what type of data do we expect back from the server
			encode: true,
			error: function (jqXHR, textStatus, errorThrown) {
				// $('#error-icon').fadeIn()
				console.log(textStatus)
				// setTimeout(function () {
				// 	// $('#modalBox').removeClass('modalBox-active')
				// 	$('#error-icon').hide()
				// }, 3000)
				$('.errorModal').addClass('modalBox-active')
				$('#modalBox').removeClass('modalBox-active')

			},
			success: function (data, textStatus, jqXHR) {
				// $('#ok-icon').fadeIn()
				// console.log(textStatus)
				// setTimeout(function () {
				// 	// $('#modalBox').removeClass('modalBox-active')
				// 	$('#ok-icon').hide()
				// }, 3000)
				$('#modalBox').removeClass('modalBox-active')
				setTimeout(()=>{
					$('.successModal').addClass('modalBox-active')
				},500)
				
				
			}
		})

		event.preventDefault();
	});
	let event = {}
	$('.btn-ok').click(()=>{
		$('.modalBox-active').removeClass('modalBox-active')
	})
	$('.btn-dist').click(openModal(event, 'dist'))
	$('.btn-cloud').click(openModal(event, 'cloud'))
	$('.btn-feedback').click(openModal(event, 'feedback'))
	$('.btn-access').click(openModal(event, 'access'))
	$('.btn-license').click(openModal(event, 'license'))
	$('#openMenu').click(openMenu)
	$('#menu-modal').click(function () {
		$('#menu-modal').fadeOut()
	})
	$('.close-btn').click(() => {
		$('.modalBox-active').removeClass('modalBox-active')
	})
	window.onclick = function (event) {
		if (event.target.className.indexOf('modalBox-active') > 0) {
			$('.modalBox-active').removeClass('modalBox-active')

		}
	}


	// if (!($(window).width() > 500 && $(window).width() < 700)) 
		fullPage('#fullpage')
	if ($(window).width() < 700) {
		$('.user-form textarea').attr('rows', '2')
		$('.modalBox textarea').attr('rows', '2')
	}

	$('.trigger-container .trigger').click(function () {
		$('.trigger-container .trigger').addClass('trigger-not-active')
		$(this).removeClass('trigger-not-active')

		var activeTab = $(this).attr("rel");
		$('.tab-container>div').removeClass('hide').hide()
		$('#' + activeTab).fadeIn('slow')
		$('#price-page button').hide();
		$('#price-page button[rel=' + activeTab + ']').show()
	})

});
$(window).load(function () {
	$(window).width() > 900 && $('body').flowtype({
		minimum: 300,
		maximum: 2000,
		minFont: 8,
		maxFont: 22,
		fontRatio: 97
	});

	var vid = videoLoader('welcome-video', './img/poster.png', './video/vid.mp4')
	setControls.customizeVideo({
		parentSection: '#welcome-container',
		allControls: '.video-control',
		pauseControl: '.video-control-pause',
		playControl: '.video-control-play',
		video: vid

	})
	// var req = new XMLHttpRequest();
	// req.open('GET', './video/demo.mp4', true);
	// req.responseType = 'blob';

	// req.onload = function () {
	// 	if (this.status === 200) {
	// 		var videoBlob = this.response;
	// 		var vidUrl = URL.createObjectURL(videoBlob); // IE10+
	// 		vid.src = vidUrl;
	// 	}
	// }
	// req.onerror = function () {
	// 	// Error
	// }

	// req.send();
})

function openMenu() {
	$('#menu-modal').removeClass('inactive')
	if ($('#menu-modal').css('display') != 'none') {
		$('#menu-modal').fadeOut()
		return
	}
	$('#menu-modal').fadeIn()
}
function objectifyForm(formArray) {//serialize data function
	
	  var returnArray = {};
	  for (var i = 0; i < formArray.length; i++){
		returnArray[formArray[i]['name']] = formArray[i]['value'];
	  }
	  return returnArray;
	}
function openModal(event, mode) {

	return function () {

		$('#modalBox').show()
		$('#modalBox #dist').prop('checked', false);
		$('#modalBox #cloud').prop('checked', false);
		$('#modalBox #quest').hide();
		$('.radio-wrap').hide()
		$('#modalBox #mail').val('')
		$('input[name=quantity], label[for=quantity]').hide()
		switch (mode) {
			case 'dist':
				$('#modalBox #dist').prop('checked', true);
				$('.radio-wrap').show()
				break;

			case 'cloud':
				$('#modalBox #cloud').prop('checked', true);
				$('.radio-wrap').show()
				break;

			case 'feedback':
				$('#modalBox #quest').show();
				break;
			case 'access':
				$('.radio-wrap').show()
				$('#modalBox #mail').val($('.section input[name="emailaddress"]').val())
				break;
			case 'license':
				$('input[name=quantity], label[for=quantity]').show()
			default:
				break;

		}
		if (event) {
			$('#modalBox').addClass('modalBox-active')
			// event.preventDefault();
			// event.cancelBubble = true;
			// event.stopPropagation()
		}
	}

}

function onSubmit(event) {
	document.getElementById('modalBox').checkValidity()
}