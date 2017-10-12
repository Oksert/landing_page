import './styles/common.scss'
import './styles/desctop.scss'
// import './styles/medium.scss'
// import './styles/small.scss'
import './styles/mobile.scss'
 
 $(document).ready(function() {
	
	$('form').submit(function(event) {
		
				// get the form data
				// there are many ways to get this data using jQuery (you can use the class or id also)
				var formData = JSON.stringify($('form').serializeArray())
		
				// process the form
				$.ajax({
					type        : 'get', // define the type of HTTP verb we want to use (POST for our form)
					url         : 'https://runidea.online/json/customerregistration', // the url where we want to POST
					data        : formData, // our data object
					dataType    : 'json', // what type of data do we expect back from the server
					encode          : true,
					error: function(jqXHR, textStatus, errorThrown) {
						$('#ok-icon').fadeIn()

						setTimeout(function(){
							// $('#modalBox').removeClass('modalBox-active')
							$('#ok-icon').hide()
						},3000)
						
						// alert(textStatus, errorThrown);
					},
					success: function(data, textStatus, jqXHR) {
						
					}
				})
					
			event.preventDefault();
	});
	$('.btn-dist').click(openModal(event,'dist'))
	$('.btn-cloud').click(openModal(event,'cloud'))
	$('.btn-feedback').click(openModal(event,'feedback'))
	$('.btn-access').click(openModal(event,'access'))
	$('.btn-license').click(openModal(event,'license'))
	$('#openMenu').click(openMenu)
	$('#menu-modal').click(function(){
		$('#menu-modal').fadeOut()
	})
	function openMenu () {
		$('#menu-modal').removeClass('inactive')
		if ($('#menu-modal').css('display') != 'none') {
			$('#menu-modal').fadeOut()
			return
		}
		// if ($('#menu .active')) {
		// 	// $('#menu').removeClass('active')
		// 	// $('#menu').addClass('inactive')
		// 	return
		// }
		// $('#menu').addClass('active')
		$('#menu-modal').fadeIn()
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
			switch(mode) {
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
			event.preventDefault();
			event.cancelBubble = true;
			event.stopPropagation()
			}
		}
   
	}
	window.onclick = function(event) {
	   if (event.target == document.getElementById('modalBox')) {
		   $('.modalBox-active').removeClass('modalBox-active')
		   
	   }
   }
   function onSubmit (event) {
	   document.getElementById('modalBox').checkValidity()
	   // event.preventDefault();
	   // event.stopPropagation()
	   // console.log(JSON.stringify($('form').serializeArray()))
	   // $(event.target).closest('.modalBox-active').removeClass('modalBox-active')
   }
	    $(window).width()>500 && $('#fullpage').fullpage({
		//Navigation
		menu: '#menu',
		anchors: ['welcome','user','workflow','analytics','schedule','join', 'faq', 'price','contact'],
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
		scrollBar: $(window).width() > 500,
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
		sectionsColor : ['#ffffff', '#ffffff','#ffffff'],
		paddingTop: '3em',
		paddingBottom: '10px',
		fixedElements: '#header, .footer',
		responsiveWidth:0,
		responsiveHeight: 0,
		responsiveSlides: true,
		parallax: true,
		parallaxOptions: {type: 'reveal', percentage: 62, property: 'translate'},

		//Custom selectors
		sectionSelector: '.section',
		slideSelector: '.slide',

		lazyLoading: true,

		//events
		onLeave: function(index, nextIndex, direction){},
		afterLoad: function(anchorLink, index){},
		afterRender: function(){},
		afterResize: function(){},
		afterResponsive: function(isResponsive){},
		afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex){},
		onSlideLeave: function(anchorLink, index, slideIndex, direction, nextSlideIndex){}
	});

	// $(".tab-slider--nav li").click(function() {
	// 	$('.tab-slider--trigger').removeClass('active')
	// 	$(this).addClass('active')
	// 	$('.tab-slider--body').hide()
	// 	var tabId = $(this).attr('rel')
	// 	$("#"+tabId).show();

	// })

	$('.trigger-container .trigger').click(function(){
		$('.trigger-container .trigger').addClass('trigger-not-active')
		$(this).removeClass('trigger-not-active')

		var activeTab = $(this).attr("rel");
		$('.tab-container>div').removeClass('hide').hide()
		$('#'+activeTab).fadeIn('slow')
		$('#price-page button').hide();
		$('#price-page button[rel='+activeTab+']').show()
		// $('#price-page button').each (function(btn) {
		// 	$('#price-page button')[0]==activeTab?$('#price-page button')[0].show():$('#price-page button')[0].hide()
		// })
	})
	
});
$(window).load(function(){ 
	$('body').flowtype({
		minimum   : 300,
		maximum   : 2000,
		minFont   : 8,
		maxFont   : 22,
		fontRatio : 97
	 });
	var vid = document.createElement('video')
	// vid.src='/video/Скриптонит - Не забирай меня с пати (Ft Надя).mp4'
	vid.controls=false
	vid.preload='none'
	vid.autoplay=true
	// setTimeout(function (){
	// 	vid.load()
	// },4000)
	vid.addEventListener('click',function(){
		this.paused?this.play():this.pause()
	},false);
	vid.onloadeddata = function() {
		document.getElementById('welcome-video').innerHTML=''
		document.getElementById('welcome-video').appendChild(vid)
	
		
	};
	var req = new XMLHttpRequest();
	req.open('GET', './video/demo.mp4', true);
	req.responseType = 'blob';
	
	req.onload = function() {
	   if (this.status === 200) {
		  var videoBlob = this.response;
		  var vidUrl = URL.createObjectURL(videoBlob); // IE10+
		  vid.src = vidUrl;
	   }
	}
	req.onerror = function() {
	   // Error
	}
	
	req.send();
 })

	