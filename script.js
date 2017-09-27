 $(document).ready(function() {
	$('form').submit(function(event) {
		
				// get the form data
				// there are many ways to get this data using jQuery (you can use the class or id also)
				var formData = JSON.stringify($('form').serializeArray())
		
				// process the form
				$.ajax({
					type        : 'get', // define the type of HTTP verb we want to use (POST for our form)
					url         : 'process.php', // the url where we want to POST
					data        : formData, // our data object
					dataType    : 'json', // what type of data do we expect back from the server
					encode          : true,
					error: function(jqXHR, textStatus, errorThrown) {
						$('#modalBox').removeClass('modalBox-active')
						alert(textStatus, errorThrown);
					},
					success: function(data, textStatus, jqXHR) {
						
					}
				})
					
			event.preventDefault();
	});
		
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
	// $(event.target).closest('.modalBox-active').removeClass('modalBox-active')
}

	