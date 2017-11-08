/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 58);
/******/ })
/************************************************************************/
/******/ ({

/***/ 58:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__styles_common_scss__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__styles_common_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__styles_common_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__styles_desctop_scss__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__styles_desctop_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__styles_desctop_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__styles_medium_scss__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__styles_medium_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__styles_medium_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__styles_mobile_scss__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__styles_mobile_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__styles_mobile_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_video_control_custom__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_fullPageSetup__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__src_video_loader__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__src_google_analytic__ = __webpack_require__(69);



// import './styles/small.scss'






$(document).ready(function () {
	Object(__WEBPACK_IMPORTED_MODULE_7__src_google_analytic__["a" /* default */])('UA-109302502-1');
	$('.group-require').click(event => {
		if ($('.group-require :checkbox:checked').length == 0) {
			document.querySelectorAll('.group-require input').forEach(elem => {
				elem.setCustomValidity("Заполните одно из полей");
			});
			$('.group-require input').prop('required', true);
		} else {
			document.querySelectorAll('.group-require input').forEach(elem => {
				elem.setCustomValidity("");
			});
			$('.group-require input').prop('required', false);
		}
	});
	$('form').submit(function (event) {

		// get the form data
		// there are many ways to get this data using jQuery (you can use the class or id also)
		var formData = objectifyForm($('#modalBox form').serializeArray());
		let userAction = [];
		let mode = $('#modalBox').data('mode');
		$('#modalBox input[useraction]').each((idx, val) => {
			if (val.checked && val.type == 'checkbox') {
				userAction.push(val.attributes.useraction.value);
			}
		});
		if (['feedback', 'license'].includes(mode)) {
			userAction.push(mode);
		}
		console.log(userAction);
		// process the form
		$.ajax({
			type: 'post', // define the type of HTTP verb we want to use (POST for our form)
			url: 'http://194.87.111.90/clientregistration', // the url where we want to POST
			contentType: "application/x-www-form-urlencoded",
			data: Object.assign(formData, { action: userAction.join(';') }), // our data object
			// dataType: 'json', // what type of data do we expect back from the server
			encode: true,
			error: function (jqXHR, textStatus, errorThrown) {
				// $('#error-icon').fadeIn()
				console.log(textStatus);
				// setTimeout(function () {
				// 	// $('#modalBox').removeClass('modalBox-active')
				// 	$('#error-icon').hide()
				// }, 3000)
				$('.errorModal').addClass('modalBox-active');
				$('#modalBox').removeClass('modalBox-active');
			},
			success: function (data, textStatus, jqXHR) {
				// $('#ok-icon').fadeIn()
				// console.log(textStatus)
				// setTimeout(function () {
				// 	// $('#modalBox').removeClass('modalBox-active')
				// 	$('#ok-icon').hide()
				// }, 3000)
				$('#modalBox').removeClass('modalBox-active');
				setTimeout(() => {
					$(`.successModal .modal-content-message div`).hide();
					$(`.successModal div[user-action="${userAction.join('&')}"]`).show();
					$('.successModal').addClass('modalBox-active');
				}, 500);
			}
		});

		event.preventDefault();
	});
	let event = {};
	$('.btn-ok').click(() => {
		$('.modalBox-active').removeClass('modalBox-active');
	});
	$('.btn-dist').click(openModal(event, 'dist'));
	$('.btn-cloud').click(openModal(event, 'cloud'));
	$('.btn-feedback').click(openModal(event, 'feedback'));
	$('.btn-access').click(openModal(event, 'access'));
	$('.btn-license').click(openModal(event, 'license'));
	$('#openMenu').click(openMenu);
	$('#menu-modal').click(function () {
		$('#menu-modal').fadeOut();
	});
	$('.close-btn').click(() => {
		$('.modalBox-active').removeClass('modalBox-active');
	});
	window.onclick = function (event) {
		if (event.target.className.indexOf('modalBox-active') > 0) {
			$('.modalBox-active').removeClass('modalBox-active');
		}
	};

	// if (!($(window).width() > 500 && $(window).width() < 700)) 
	Object(__WEBPACK_IMPORTED_MODULE_5__src_fullPageSetup__["a" /* default */])('#fullpage');
	if ($(window).width() < 700) {
		$('.user-form textarea').attr('rows', '2');
		$('.modalBox textarea').attr('rows', '2');
	}

	$('.trigger-container .trigger').click(function () {
		$('.trigger-container .trigger').addClass('trigger-not-active');
		$(this).removeClass('trigger-not-active');

		var activeTab = $(this).attr("rel");
		$('.tab-container>div').removeClass('hide').hide();
		$('#' + activeTab).fadeIn('slow');
		$('#price-page button').hide();
		$('#price-page button[rel=' + activeTab + ']').show();
	});
});
$(window).load(function () {
	$(window).width() > 900 && $('body').flowtype({
		minimum: 300,
		maximum: 2000,
		minFont: 8,
		maxFont: 22,
		fontRatio: 97
	});

	var vid = Object(__WEBPACK_IMPORTED_MODULE_6__src_video_loader__["a" /* default */])('welcome-video', './img/poster.png', './video/vid.mp4');
	__WEBPACK_IMPORTED_MODULE_4__src_video_control_custom__["a" /* default */].customizeVideo({
		parentSection: '#welcome-container',
		allControls: '.video-control',
		pauseControl: '.video-control-pause',
		playControl: '.video-control-play',
		video: vid

	});
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
});

function openMenu() {
	$('#menu-modal').removeClass('inactive');
	if ($('#menu-modal').css('display') != 'none') {
		$('#menu-modal').fadeOut();
		return;
	}
	$('#menu-modal').fadeIn();
}
function objectifyForm(formArray) {
	//serialize data function

	var returnArray = {};
	for (var i = 0; i < formArray.length; i++) {
		returnArray[formArray[i]['name']] = formArray[i]['value'];
	}
	return returnArray;
}
function openModal(event, mode) {

	return function () {
		window.ga('create', 'UA-109302502-1', 'auto');
		window.ga('send', {
			hitType: 'event',
			eventCategory: 'Button',
			eventAction: 'click',
			eventLabel: mode
		});
		$('#modalBox').show();
		$('#modalBox').data('mode', mode);
		$('#modalBox #dist').prop('checked', false);
		$('#modalBox #cloud').prop('checked', false);
		$('#modalBox #quest').hide();
		$('.radio-wrap').hide();
		$('#modalBox #mail').val('');
		$('.modalBox form').data("user-action", mode);
		$('input[name=quantity], label[for=quantity]').hide();
		switch (mode) {
			case 'dist':
				$('#modalBox #dist').prop('checked', true);
				$('.radio-wrap').show();
				break;

			case 'cloud':
				$('#modalBox #cloud').prop('checked', true);
				$('.radio-wrap').show();
				break;

			case 'feedback':
				$('#modalBox #quest').show();
				break;
			case 'access':
				$('.radio-wrap').show();
				$('#modalBox #mail').val($('.section input[name="emailaddress"]').val());
				$('#modalBox #cloud').prop('checked', true);
				break;
			case 'license':
				$('input[name=quantity], label[for=quantity]').show();
				$('input[name=quantity]').prop('required', true);
			default:
				break;

		}
		if (event) {
			$('#modalBox').addClass('modalBox-active');
			// event.preventDefault();
			// event.cancelBubble = true;
			// event.stopPropagation()
		}
	};
}

function onSubmit(event) {
	document.getElementById('modalBox').checkValidity();
}

/***/ }),

/***/ 59:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 63:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 64:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 65:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 66:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
    customizeVideo: customizeVideo
});
function customizeVideo(vidContainerObj) {
    let { parentSection, allControls, pauseControl, playControl, video } = vidContainerObj;
    $(parentSection).mouseenter(() => {
        video.paused ? $(playControl).fadeIn() : $(pauseControl).fadeIn();
    }).mouseleave(() => {
        $(allControls).fadeOut();
    });
    setPause(pauseControl, video);
    setPlay(playControl, video);
}
function setPause(pauseControl, video, playControl) {
    $(pauseControl).click(() => {
        video.pause();
        $(pauseControl).hide();
        // setTimeout(()=>$(playControl).fadeIn())
        $(playControl).show();
    });
}
function setPlay(playControl, video, pauseControl) {
    $(playControl).click(() => {
        video.play();
        $(playControl).hide();
        // setTimeout(()=>$(pauseControl).fadeIn())
        $(pauseControl).show();
    });
}

/***/ }),

/***/ 67:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = SetUpFullPage;
function SetUpFullPage(fullpageselector) {
    $(fullpageselector).fullpage({
        //Navigation
        menu: '#menu',
        anchors: ['welcome', 'user', 'workflow', 'analytics', 'schedule', 'join', 'faq', 'price', 'contact'],
        navigation: $(window).width() > 500,
        navigationPosition: 'right',
        // navigationTooltips: ['firstSlide', 'secondSlide'],
        showActiveTooltip: false,
        slidesNavigation: false,
        slidesNavPosition: 'bottom',

        //Scrolling
        css3: true,
        scrollingSpeed: 700,
        autoScrolling: true,
        fitToSection: true,
        fitToSectionDelay: 1000,
        scrollBar: $(window).width() > 800,
        easing: 'easeInOutCubic',
        easingcss3: 'ease',
        loopBottom: false,
        loopTop: false,
        loopHorizontal: true,
        continuousVertical: false,
        continuousHorizontal: false,
        scrollHorizontally: false,
        interlockedSlides: false,
        dragAndMove: false,
        offsetSections: false,
        resetSliders: false,
        fadingEffect: true,
        normalScrollElements: '#element1, .element2',
        scrollOverflow: false,
        scrollOverflowReset: false,
        scrollOverflowOptions: null,
        touchSensitivity: 15,
        normalScrollElementTouchThreshold: 5,
        bigSectionsDestination: null,

        //Accessibility
        keyboardScrolling: true,
        animateAnchor: true,
        recordHistory: true,

        //Design
        controlArrows: true,
        verticalCentered: true,
        sectionsColor: ['#ffffff', '#ffffff', '#ffffff'],
        paddingTop: '3em',
        paddingBottom: '10px',
        fixedElements: '#header, .footer',
        responsiveWidth: 0,
        responsiveHeight: 0,
        responsiveSlides: true,
        parallax: true,
        parallaxOptions: { type: 'reveal', percentage: 62, property: 'translate' },

        //Custom selectors
        sectionSelector: '.section',
        slideSelector: '.slide',

        lazyLoading: true,

        //events
        onLeave: function (index, nextIndex, direction) {},
        afterLoad: function (anchorLink, index) {},
        afterRender: function () {},
        afterResize: function () {},
        afterResponsive: function (isResponsive) {},
        afterSlideLoad: function (anchorLink, index, slideAnchor, slideIndex) {},
        onSlideLeave: function (anchorLink, index, slideIndex, direction, nextSlideIndex) {}
    });
}

/***/ }),

/***/ 68:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = videoLoader;
function videoLoader(parentContainerid, posterImg, videoSrcPath) {
	var vid = document.createElement('video');
	vid.preload = false;
	vid.autoplay = false;
	// vid.poster = posterImg
	// setTimeout(function (){
	// 	vid.load()
	// },4000)
	vid.src = videoSrcPath;
	// vid.addEventListener('click', function () {
	// 	this.paused ? this.play() : this.pause()
	// }, false);
	vid.onended = () => {
		vid.currentTime = 0;
	};
	vid.onloadeddata = function () {
		document.getElementById(parentContainerid).innerHTML = '';
		document.getElementById(parentContainerid).appendChild(vid);
	};
	return vid;
}

/***/ }),

/***/ 69:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = initAnalytic;
function initAnalytic(resourseId) {
    window.ga('create', resourseId, 'auto');
    window.ga('send', 'pageview');
    window.addEventListener("hashchange", function () {
        console.log('hash changed');
        window.ga('send', 'pageview', {
            'page': location.hash || '/'
        });
    });
}

/***/ })

/******/ });
//# sourceMappingURL=entry1.js.map