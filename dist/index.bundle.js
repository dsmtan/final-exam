/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 	};
/******/
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"index": 0
/******/ 	};
/******/
/******/
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + ({"json/eventInfo":"json/eventInfo","json/speakers":"json/speakers"}[chunkId]||chunkId) + ".bundle.js"
/******/ 	}
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
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							var error = new Error('Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')');
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scss_styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/styles.scss */ \"./src/scss/styles.scss\");\n/* harmony import */ var _scss_styles_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_scss_styles_scss__WEBPACK_IMPORTED_MODULE_0__);\n // don't delete! or cry.\n\nvar header = document.querySelector('.header--main');\nvar eventTitle = document.querySelector('.h1--eventtitle');\nvar eventTagline = document.querySelector('.h2--eventsubtitle');\nvar navBar = document.querySelector('.section--navbar');\nvar navBarInfo = document.querySelector('.div--eventessentials');\nvar aboutDescription = document.querySelector('.p--aboutDescription');\nvar aboutImage = document.querySelector('.img--about');\nvar firstSpeakerDiv = document.querySelector('.div--firstspeakers');\nvar collapsedSpeakerDiv = document.querySelector('.div--collapsiblespeakers');\nvar collapseButton = document.querySelector('#collapseButton');\nvar ticketTypesDiv = document.querySelector('.div--ticketTypes');\nvar partnerDiv = document.querySelector('.div--partners');\nvar speakerTemplate = document.querySelector('#featuredSpeakerTemplate').content;\nvar ticketTemplate = document.querySelector('#ticketTemplate').content;\nvar partnerTemplate = document.querySelector('#featuredPartnerTemplate').content;\nvar websiteSettings = [];\nvar speakers = [];\nvar isCollapsed = true;\n\nwindow.onload = function () {\n  __webpack_require__.e(/*! import() | json/eventInfo */ \"json/eventInfo\").then(__webpack_require__.t.bind(null, /*! ./json/eventInfo.json */ \"./src/js/json/eventInfo.json\", 3)).then(function (_ref) {\n    var eventData = _ref[\"default\"];\n    websiteSettings = eventData;\n    console.log(eventData);\n    setWebsiteColors(websiteSettings);\n    setHeader(websiteSettings);\n    setAbout(websiteSettings);\n    setTickets(websiteSettings);\n    setPartners(websiteSettings);\n  });\n  __webpack_require__.e(/*! import() | json/speakers */ \"json/speakers\").then(__webpack_require__.t.bind(null, /*! ./json/speakers.json */ \"./src/js/json/speakers.json\", 3)).then(function (_ref2) {\n    var speakerData = _ref2[\"default\"];\n    speakers = speakerData;\n    setSpeakers(speakers);\n  });\n};\n\nwindow.addEventListener('DOMContentLoaded', loadCalendarSVG);\n\nfunction loadCalendarSVG() {\n  fetch('./images/calendar.svg').then(function (response) {\n    return response.text();\n  }).then(function (svgdata) {\n    document.querySelector('#calendarSvgContainer').insertAdjacentHTML('afterbegin', svgdata);\n  });\n}\n\nwindow.addEventListener('scroll', function (e) {\n  if (window.scrollY < 20) {\n    navBar.classList.remove('onscrollHeight');\n    navBarInfo.classList.remove('scrollDown');\n  } else {\n    navBar.classList.add('onscrollHeight');\n    navBarInfo.classList.add('scrollDown');\n  }\n});\ncollapseButton.addEventListener('click', function (e) {\n  isCollapsed = !isCollapsed;\n  collapsedSpeakerDiv.classList.toggle('collapsed');\n  collapseButton.textContent = isCollapsed ? 'See more' : 'See less';\n});\n\nvar setWebsiteColors = function setWebsiteColors() {\n  document.documentElement.style.setProperty('--mainColor', websiteSettings.mainEventColor);\n  document.documentElement.style.setProperty('--secondaryColor', websiteSettings.secondaryColor);\n};\n\nvar setHeader = function setHeader(websiteSettings) {\n  header.style.backgroundImage = \"url(\".concat(websiteSettings.coverPhoto, \")\");\n  eventTitle.textContent = websiteSettings.eventTitle;\n  eventTagline.textContent = websiteSettings.eventTagline;\n};\n\nvar setAbout = function setAbout(websiteSettings) {\n  aboutDescription.innerHTML = websiteSettings.description;\n  aboutImage.src = websiteSettings.aboutImage;\n};\n\nvar setSpeakers = function setSpeakers(speakers) {\n  speakers.slice(0, 6).map(function (featuredSpeaker) {\n    var speakerCopy = speakerTemplate.cloneNode(true);\n    var newSpeaker = speakerCopy.querySelector('.div--speakerfeatured');\n    newSpeaker.querySelector('img').src = featuredSpeaker.speakerFeaturedImg;\n    newSpeaker.querySelector('h3').textContent = featuredSpeaker.speakerName;\n    newSpeaker.querySelector('p').textContent = featuredSpeaker.speakerPosition;\n    firstSpeakerDiv.appendChild(newSpeaker);\n  });\n  speakers.slice(6).map(function (featuredSpeaker) {\n    var speakerCopy = speakerTemplate.cloneNode(true);\n    var newSpeaker = speakerCopy.querySelector('.div--speakerfeatured');\n    newSpeaker.querySelector('img').src = featuredSpeaker.speakerFeaturedImg;\n    newSpeaker.querySelector('h3').textContent = featuredSpeaker.speakerName;\n    newSpeaker.querySelector('p').textContent = featuredSpeaker.speakerPosition;\n    collapsedSpeakerDiv.appendChild(newSpeaker);\n  });\n};\n\nvar setTickets = function setTickets(websiteSettings) {\n  websiteSettings.ticketTypes.map(function (ticketType) {\n    var ticketCopy = ticketTemplate.cloneNode(true);\n    var ticketDiv = ticketCopy.querySelector('.div--ticketItem');\n    ticketDiv.querySelector('h3').textContent = ticketType.ticketName;\n    ticketDiv.querySelector('p').textContent = ticketType.ticketPrice;\n    ticketType.included.map(function (item) {\n      var listItem = document.createElement('li');\n      listItem.textContent = item;\n      ticketDiv.appendChild(listItem);\n    });\n    ticketTypesDiv.appendChild(ticketDiv);\n  });\n};\n\nvar setPartners = function setPartners(websiteSettings) {\n  websiteSettings.featuredPartners.map(function (partner) {\n    var newPartner = partnerTemplate.cloneNode(true);\n    newPartner.querySelector('.img--partnerFeatured').style.backgroundImage = \"url(\".concat(partner.logo, \")\");\n    partnerDiv.appendChild(newPartner);\n  });\n};\n\n//# sourceURL=webpack:///./src/js/index.js?");

/***/ }),

/***/ "./src/scss/styles.scss":
/*!******************************!*\
  !*** ./src/scss/styles.scss ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/scss/styles.scss?");

/***/ })

/******/ });