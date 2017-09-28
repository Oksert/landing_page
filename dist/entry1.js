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
/******/ 	return __webpack_require__(__webpack_require__.s = 61);
/******/ })
/************************************************************************/
/******/ ({

/***/ 22:
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ 23:
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(24);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ 24:
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ 61:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__styles_style_scss__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__styles_style_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__styles_style_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__desctop_css__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__desctop_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__desctop_css__);


$(document).ready(function () {
	$('form').submit(function (event) {

		// get the form data
		// there are many ways to get this data using jQuery (you can use the class or id also)
		var formData = JSON.stringify($('form').serializeArray());

		// process the form
		$.ajax({
			type: 'get', // define the type of HTTP verb we want to use (POST for our form)
			url: 'process.php', // the url where we want to POST
			data: formData, // our data object
			dataType: 'json', // what type of data do we expect back from the server
			encode: true,
			error: function (jqXHR, textStatus, errorThrown) {
				$('#modalBox').removeClass('modalBox-active');
				alert(textStatus, errorThrown);
			},
			success: function (data, textStatus, jqXHR) {}
		});

		event.preventDefault();
	});
	$('.btn').click(openModal);
	function openModal(event) {
		if (event) {
			$('#modalBox').addClass('modalBox-active');
			event.preventDefault();
			event.cancelBubble = true;
			event.stopPropagation();
		}
	}
	window.onclick = function (event) {
		if (event.target == document.getElementById('modalBox')) {
			$('.modalBox-active').removeClass('modalBox-active');
		}
	};
	function onSubmit(event) {
		document.getElementById('modalBox').checkValidity();
		// event.preventDefault();
		// event.stopPropagation()
		// console.log(JSON.stringify($('form').serializeArray()))
		// $(event.target).closest('.modalBox-active').removeClass('modalBox-active')
	}

	$('#fullpage').fullpage({
		//Navigation
		menu: '#menu',
		anchors: ['welcome', 'workflow', 'analytics', 'schedule', 'join', 'faq', 'price'],
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
		sectionsColor: ['#ffffff', '#ffffff', '#ffffff'],
		paddingTop: '3em',
		paddingBottom: '10px',
		fixedElements: '#header, .footer',
		responsiveWidth: 500,
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
	// $(".tab-slider--nav li").click(function() {
	// 	$('.tab-slider--trigger').removeClass('active')
	// 	$(this).addClass('active')
	// 	$('.tab-slider--body').hide()
	// 	var tabId = $(this).attr('rel')
	// 	$("#"+tabId).show();

	// })

	$('.trigger-container .trigger').click(function () {
		$('.trigger-container .trigger').addClass('trigger-not-active');
		$(this).removeClass('trigger-not-active');

		var activeTab = $(this).attr("rel");
		$('.tab-container>div').removeClass('hide').hide();
		console.log('#' + activeTab);
		$('#' + activeTab).fadeIn('slow');
	});
});
$(window).load(function () {

	var vid = document.createElement('video');
	// vid.src='/video/Скриптонит - Не забирай меня с пати (Ft Надя).mp4'
	vid.controls = true;
	// vid.preload='none'
	// setTimeout(function (){
	// 	vid.load()
	// },4000)

	vid.onloadeddata = function () {
		document.getElementById('welcome-section').innerHTML = '';
		document.getElementById('welcome-section').appendChild(vid);
	};
	var req = new XMLHttpRequest();
	req.open('GET', '/video/Скриптонит - Не забирай меня с пати (Ft Надя).mp4', true);
	req.responseType = 'blob';

	req.onload = function () {
		if (this.status === 200) {
			var videoBlob = this.response;
			var vidUrl = URL.createObjectURL(videoBlob); // IE10+
			vid.src = vidUrl;
		}
	};
	req.onerror = function () {
		// Error
	};

	req.send();
});

/***/ }),

/***/ 62:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 63:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(64);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(23)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./node_modules/css-loader/index.js!./desctop.css", function() {
			var newContent = require("!!./node_modules/css-loader/index.js!./desctop.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 64:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(22)(undefined);
// imports


// module
exports.push([module.i, ".section-center {\r\n    margin: auto;\r\n    text-align: center;\r\n    width: 80%;\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: center;\r\n    /* vertical-align: middle; */\r\n}\r\n.menu ul {\r\n    margin-left: 0px;\r\n    padding-left: 0px;\r\n    \r\n}\r\n/* .fullpage:nth-child(even) .section-center {\r\n    flex-direction: row-reverse;\r\n} */\r\n.menu li {\r\n    float: right;\r\n}\r\n.only-mobile {\r\n    display: none;\r\n}\r\n#header {\r\n    background-color: lightblue;\r\n}\r\nul {\r\n    text-decoration: none; \r\n    list-style: none;\r\n    padding-left: 0px;\r\n    /* text-align: left; */\r\n}\r\n.float-left  {\r\n    text-align: right;\r\n}\r\n.float-right {\r\n    text-align: left;\r\n}\r\n.content-disc {\r\n    /* float: right; */\r\n    width: 50%;\r\n    align-self: end;\r\n    /* font-size: 20px; */\r\n    text-align: left;\r\n    margin-top: -2%;\r\n}\r\ndiv.reverse {\r\n    flex-direction: row-reverse;\r\n}\r\nbody {\r\n    font-family: \"Helvetica\", \"Arial\", sans-serif;\r\n    line-height: 1.5;\r\n    padding: 4em 1em;\r\n    color: #555;\r\n    font-size: 20px;\r\n}\r\nh1,\r\nh2,\r\nstrong {\r\n  color: #555;\r\n  font-size: 2.7em;\r\n  line-height: 1.3em;\r\n}\r\n.section-center img {\r\n    box-sizing: border-box;\r\n    margin: 0px 10px 0px 10px;\r\n    width: 90%;\r\n    box-shadow: 0 0 65px rgba(0,0,0,0.5);\r\n    border-radius: 5px;\r\n}\r\ndiv.logo {\r\n    display: flex;\r\n    padding: 5px 0px 5px 0px;\r\n}\r\n.logo span {\r\n    font-family: 'Nobile', cursive;\r\n    font-weight: bold;\r\n    font-size: 40px;\r\n    /* color:#446772; */\r\n    margin-left: -8px;\r\n}\r\n.logo a, .logo a:hover, .logo a:active, .logo a:focus {\r\n    display: inherit;\r\n    color: inherit;\r\n    text-decoration: none;\r\n}\r\n.logo img {\r\n    height: 60px;\r\n}\r\n.header-top {\r\n    padding:1% 0% 0% 5%;\r\n}\r\nvideo {\r\n    width: 90%;\r\n}\r\n#head{\r\n    position: fixed;\r\n    z-index: 9;\r\n    background:white;\r\n    /* padding:10px 0px 0px 80px; */\r\n    width: 100%;\r\n    display: flex;\r\n    font-size: 16px;\r\n    align-items: center;\r\n    justify-content: center;\r\n    box-shadow: 0 1px 1px rgba(0,0,0,.15)\r\n\r\n}\r\n#head-content {\r\n    display: flex;\r\n    width: 80%;\r\n    justify-content: space-between;\r\n}\r\n.btn {\r\n    border:none;\r\n    background: #de5021;\r\n    background-image: -webkit-linear-gradient(top, #de5021, #e06743);\r\n    background-image: -moz-linear-gradient(top, #de5021, #e06743);\r\n    background-image: -ms-linear-gradient(top, #de5021, #e06743);\r\n    background-image: -o-linear-gradient(top, #de5021, #e06743);\r\n    background-image: linear-gradient(to bottom, #de5021, #e06743);\r\n    -webkit-border-radius: 0;\r\n    -moz-border-radius: 0;\r\n    border-radius: 0px;\r\n    font-family: Arial;\r\n    font-size: 20px;\r\n    color: #ffffff;\r\n    cursor: pointer;\r\n    padding: 10px 20px 10px 20px;\r\n    text-decoration: none;\r\n  }\r\n  .btn-block {\r\n      display: block;\r\n      margin-top: 20px;\r\n  }\r\n  .btn:hover {\r\n    background: #ed6b47;\r\n    background-image: -webkit-linear-gradient(top, #ed6b47, #ff7d59);\r\n    background-image: -moz-linear-gradient(top, #ed6b47, #ff7d59);\r\n    background-image: -ms-linear-gradient(top, #ed6b47, #ff7d59);\r\n    background-image: -o-linear-gradient(top, #ed6b47, #ff7d59);\r\n    background-image: linear-gradient(to bottom, #ed6b47, #ff7d59);\r\n    text-decoration: none;\r\n  }\r\n input[type=\"email\"]{\r\n    box-sizing: border-box;\r\n    -webkit-box-sizing: border-box;\r\n    -moz-box-sizing: border-box;\r\n    outline: none;\r\n    display: block; \r\n    width: 100%;\r\n    padding: 7px;\r\n    border: none;\r\n    border-bottom: 1px solid #ddd;\r\n    background: transparent;\r\n    margin-bottom: 10px;\r\n    font: 20px Arial, Helvetica, sans-serif;\r\n    height: 45px;\r\n    margin: 10% 0px 0px 0px;\r\n}\r\n\r\n.content-disc li {\r\n    padding-bottom: 10px;\r\n}\r\n.sign-in {\r\n    display: flex;\r\n    flex-direction: row-reverse;\r\n    margin-right: 10%;\r\n}\r\n#menu li {\r\n\tdisplay:inline-block;\r\n\tmargin: 10px;\r\n\tcolor: #000;\r\n\tbackground:#fff;\r\n\tbackground: rgba(255,255,255, 0.5);\r\n\t-webkit-border-radius: 10px; \r\n            border-radius: 10px; \r\n}\r\n#menu li.active{\r\n\tbackground:#666;\r\n\tbackground: white;\r\n    color:black;\r\n    \r\n}\r\n#menu li a{\r\n\ttext-decoration:none;\r\n\tcolor: #555;\r\n}\r\n#menu li a:hover, a:hover, a:focus {\r\n    color: #DE4F20;\r\n}\r\n/* #menu li.active {\r\n    box-shadow: 0px 4px 14px #8db0c6;\r\n}\r\n#menu li a,\r\n#menu li.active a{\r\n\tpadding: 9px 18px;\r\n\tdisplay:block;\r\n} */\r\n/* #menu li.active a{\r\n\tcolor: #fff;\r\n} */\r\n.column {\r\n    width:65%;\r\n}\r\n.column-big {\r\n    width: 100%;\r\n}\r\n.column-big img {\r\n    box-shadow: none;\r\n}\r\n.сolumn-small {\r\n    width: 40%;\r\n}\r\n.column-flex {\r\n    display: flex;\r\n    flex-direction: column;\r\n    justify-content: space-between;\r\n}\r\n.row-disp {\r\n    display: flex;\r\n    justify-content: space-around;\r\n}\r\n.info-box {\r\n    width:40%;\r\n    transition: box-shadow .3s;\r\n    text-align: center;\r\n    background-color:rgb(241, 241, 241);\r\n    padding: 20px;\r\n    /* box-shadow: 0 0 65px rgba(105, 104, 104, 0.50); */\r\n    border-radius: 0px;\r\n   \r\n}\r\n.info-box:hover {\r\n    box-shadow: 0 0 65px rgba(105, 104, 104, 0.50);\r\n  }\r\n.info-box h1 {\r\n    /* font-size: 4em */\r\n}\r\n.info-btn {\r\n    margin-top: 30px;\r\n}\r\n#access-page h1, #learnhow h1 {\r\n    margin-bottom:6%;\r\n    /* font-size: 3.5em; */\r\n}\r\n.flex-center {\r\n    justify-content: center;\r\n}\r\n", ""]);

// exports


/***/ })

/******/ });