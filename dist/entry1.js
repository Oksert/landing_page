!function(e){function o(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,o),i.l=!0,i.exports}var t={};o.m=e,o.c=t,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,o){return Object.prototype.hasOwnProperty.call(e,o)},o.p="",o(o.s=58)}({58:function(e,o,t){"use strict";function n(){$("#menu-modal").removeClass("inactive"),"none"==$("#menu-modal").css("display")?$("#menu-modal").fadeIn():$("#menu-modal").fadeOut()}function i(e,o){return function(){switch($("#modalBox").show(),$("#modalBox #dist").prop("checked",!1),$("#modalBox #cloud").prop("checked",!1),$("#modalBox #quest").hide(),$(".radio-wrap").hide(),$("#modalBox #mail").val(""),$("input[name=quantity], label[for=quantity]").hide(),o){case"dist":$("#modalBox #dist").prop("checked",!0),$(".radio-wrap").show();break;case"cloud":$("#modalBox #cloud").prop("checked",!0),$(".radio-wrap").show();break;case"feedback":$("#modalBox #quest").show();break;case"access":$(".radio-wrap").show(),$("#modalBox #mail").val($('.section input[name="emailaddress"]').val());break;case"license":$("input[name=quantity], label[for=quantity]").show()}e&&($("#modalBox").addClass("modalBox-active"),e.preventDefault(),e.cancelBubble=!0,e.stopPropagation())}}Object.defineProperty(o,"__esModule",{value:!0});var a=t(59),r=(t.n(a),t(63)),c=(t.n(r),t(64)),l=(t.n(c),t(65)),s=t(66),d=t(67);$(document).ready(function(){$("form").submit(function(e){var o=JSON.stringify($("form").serializeArray());$.ajax({type:"get",url:"https://runidea.online/json/customerregistration",data:o,dataType:"json",encode:!0,error:function(e,o,t){$("#ok-icon").fadeIn(),setTimeout(function(){$("#ok-icon").hide()},3e3)},success:function(e,o,t){}}),e.preventDefault()});let e={};$(".btn-dist").click(i(e,"dist")),$(".btn-cloud").click(i(e,"cloud")),$(".btn-feedback").click(i(e,"feedback")),$(".btn-access").click(i(e,"access")),$(".btn-license").click(i(e,"license")),$("#openMenu").click(n),$("#menu-modal").click(function(){$("#menu-modal").fadeOut()}),$(".close-btn").click(()=>{$(".modalBox-active").removeClass("modalBox-active")}),window.onclick=function(e){e.target==document.getElementById("modalBox")&&$(".modalBox-active").removeClass("modalBox-active")},Object(s.a)("#fullpage"),$(window).width()<500&&($(".user-form textarea").attr("rows","4"),$(".modalBox textarea").attr("rows","2")),$(".trigger-container .trigger").click(function(){$(".trigger-container .trigger").addClass("trigger-not-active"),$(this).removeClass("trigger-not-active");var e=$(this).attr("rel");$(".tab-container>div").removeClass("hide").hide(),$("#"+e).fadeIn("slow"),$("#price-page button").hide(),$("#price-page button[rel="+e+"]").show()})}),$(window).load(function(){$(window).width()>500&&$("body").flowtype({minimum:300,maximum:2e3,minFont:8,maxFont:22,fontRatio:97});var e=Object(d.a)("welcome-video","./img/poster.png","./video/vid.mp4");l.a.customizeVideo({parentSection:"#welcome-container",allControls:".video-control",pauseControl:".video-control-pause",playControl:".video-control-play",video:e})})},59:function(e,o){},63:function(e,o){},64:function(e,o){},65:function(e,o,t){"use strict";function n(e,o,t){$(e).click(()=>{o.pause(),$(e).hide(),$(t).show()})}function i(e,o,t){$(e).click(()=>{o.play(),$(e).hide(),$(t).show()})}o.a={customizeVideo:function(e){let{parentSection:o,allControls:t,pauseControl:a,playControl:r,video:c}=e;$(o).mouseenter(()=>{c.paused?$(r).fadeIn():$(a).fadeIn()}).mouseleave(()=>{$(t).fadeOut()}),n(a,c),i(r,c)}}},66:function(e,o,t){"use strict";o.a=function(e){$(e).fullpage({menu:"#menu",anchors:["welcome","user","workflow","analytics","schedule","join","faq","price","contact"],navigation:$(window).width()>500,navigationPosition:"right",showActiveTooltip:!1,slidesNavigation:!1,slidesNavPosition:"bottom",css3:!0,scrollingSpeed:700,autoScrolling:!0,fitToSection:!0,fitToSectionDelay:1e3,scrollBar:$(window).width()>500,easing:"easeInOutCubic",easingcss3:"ease",loopBottom:!1,loopTop:!1,loopHorizontal:!0,continuousVertical:!1,continuousHorizontal:!1,scrollHorizontally:!1,interlockedSlides:!1,dragAndMove:!1,offsetSections:!1,resetSliders:!1,fadingEffect:!0,normalScrollElements:"#element1, .element2",scrollOverflow:!1,scrollOverflowReset:!1,scrollOverflowOptions:null,touchSensitivity:15,normalScrollElementTouchThreshold:5,bigSectionsDestination:null,keyboardScrolling:!0,animateAnchor:!0,recordHistory:!0,controlArrows:!0,verticalCentered:!0,sectionsColor:["#ffffff","#ffffff","#ffffff"],paddingTop:"3em",paddingBottom:"10px",fixedElements:"#header, .footer",responsiveWidth:0,responsiveHeight:0,responsiveSlides:!0,parallax:!0,parallaxOptions:{type:"reveal",percentage:62,property:"translate"},sectionSelector:".section",slideSelector:".slide",lazyLoading:!0,onLeave:function(e,o,t){},afterLoad:function(e,o){},afterRender:function(){},afterResize:function(){},afterResponsive:function(e){},afterSlideLoad:function(e,o,t,n){},onSlideLeave:function(e,o,t,n,i){}})}},67:function(e,o,t){"use strict";o.a=function(e,o,t){var n=document.createElement("video");return n.preload=!1,n.autoplay=!1,n.src=t,n.onended=(()=>{n.currentTime=0}),n.onloadeddata=function(){document.getElementById(e).innerHTML="",document.getElementById(e).appendChild(n)},n}}});