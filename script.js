 $(document).ready(function() {
    $('#fullpage').fullpage({
		//Navigation
		menu: '#menu',
		anchors: ['welcome','workflow','analytics','schedule','join', 'faq', 'price'],
		navigation: true,
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
		scrollBar: true,
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
		responsiveWidth: 500,
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
		console.log('#'+activeTab)
		$('#'+activeTab).fadeIn('slow')
	})
	// $(".tab-slider--body").hide();
	// $(".tab-slider--body:first").show();
	// $(".tab-slider--nav li").click(function() {
	// 	$(".tab-slider--body").hide();
	// 	var activeTab = $(this).attr("rel");
	// 	$("#"+activeTab).show();
	// 	  if($(this).attr("rel") == "tab2"){
	// 		  $('.tab-slider--tabs').addClass('slide');
	// 	  }else{
	// 		  $('.tab-slider--tabs').removeClass('slide');
	// 	  }
	// 	$(".tab-slider--nav li").removeClass("active");
	// 	$(this).addClass("active");
	//   });
});
$(window).load(function(){ 

	var vid = document.createElement(`video`)
	// vid.src='/video/Скриптонит - Не забирай меня с пати (Ft Надя).mp4'
	vid.controls=true
	// vid.preload='none'
	// setTimeout(function (){
	// 	vid.load()
	// },4000)
	
	vid.onloadeddata = function() {
		document.getElementById('welcome-section').innerHTML=''
		document.getElementById('welcome-section').appendChild(vid)
	
		
	};
	var req = new XMLHttpRequest();
	req.open('GET', '/video/Скриптонит - Не забирай меня с пати (Ft Надя).mp4', true);
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
 function openModal(event) {
	 if (event) {
		$('#modalBox').addClass('modalBox-active')
		event.preventDefault();
		event.cancelBubble = true;
		event.stopPropagation()
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
	// // $(event.target).closest('.modalBox-active').removeClass('modalBox-active')
}