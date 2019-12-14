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
/******/ 		"program": 0
/******/ 	};
/******/
/******/
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + ({"json/programSessions":"json/programSessions","json/programSettings":"json/programSettings","json/speakers":"json/speakers"}[chunkId]||chunkId) + ".bundle.js"
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/program.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/program.js":
/*!***************************!*\
  !*** ./src/js/program.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar programGrid = document.querySelector('.program--grid');\nvar speakers = [];\nvar programSettings = [];\nvar eventSessions = [];\nvar favouriteList = localStorage.getItem('favouriteList') === null ? [] : localStorage.getItem('favouriteList'); //templates\n\nvar daysButtonTemplate = document.querySelector('#daysButtonTemplate').content;\nvar stageColumnTemplate = document.querySelector('#stageColumnTemplate').content;\nvar sessionCardTemplate = document.querySelector('#sessionCardTemplate').content; // init\n\nwindow.onload = function () {\n  localStorage.clear(); // for dev purposes in prod it will remember\n  // fetch programSettings and speakers data\n\n  __webpack_require__.e(/*! import() | json/programSettings */ \"json/programSettings\").then(__webpack_require__.t.bind(null, /*! ./json/programSettings.json */ \"./src/js/json/programSettings.json\", 3)).then(function (_ref) {\n    var programData = _ref[\"default\"];\n    programSettings = programData;\n    fetchEventSessions(programSettings);\n  });\n  __webpack_require__.e(/*! import() | json/speakers */ \"json/speakers\").then(__webpack_require__.t.bind(null, /*! ./json/speakers.json */ \"./src/js/json/speakers.json\", 3)).then(function (_ref2) {\n    var speakerData = _ref2[\"default\"];\n    speakers = speakerData;\n  });\n};\n\nvar fetchEventSessions = function fetchEventSessions(_ref3) {\n  var eventID = _ref3.eventID,\n      eventDays = _ref3.eventDays,\n      eventStages = _ref3.eventStages;\n  // get the right program sessions for this event\n  __webpack_require__.e(/*! import() | json/programSessions */ \"json/programSessions\").then(__webpack_require__.t.bind(null, /*! ./json/programSessions.json */ \"./src/js/json/programSessions.json\", 3)).then(function (_ref4) {\n    var programSessions = _ref4[\"default\"];\n    var eventProgram = programSessions.find(function (event) {\n      return event.eventID === eventID;\n    });\n    eventSessions = eventProgram.eventSessions;\n    console.log(eventSessions);\n\n    if (eventSessions.length > 0) {\n      constructDaysBar(eventDays);\n      constructStageColumns(eventDays, eventStages);\n    }\n  });\n};\n\nvar constructDaysBar = function constructDaysBar(eventDays) {\n  eventDays.map(function (day, index) {\n    var dayNumber = index + 1;\n    var dayStart = new Date(\"\".concat(day.date, \", \").concat(day.startTime)); //convert to UTC format\n\n    var dayEnd = new Date(\"\".concat(day.date, \", \").concat(day.endTime));\n    var dayDurationHours = (dayEnd.getTime() - dayStart.getTime()) / (1000 * 3600); //number of sections to create vertical timeline\n\n    var dayDateNumber = dayStart.getDate();\n    var abbrOptions = {\n      weekday: 'short'\n    };\n    var dayOfWeek = new Intl.DateTimeFormat('en-US', abbrOptions).format(dayStart);\n    var dayData = {\n      dayNumber: dayNumber,\n      dayDateNumber: dayDateNumber,\n      dayOfWeek: dayOfWeek\n    };\n    createDaysButton(dayData);\n  });\n  constructTimeline();\n};\n\nvar daysBar = document.querySelector('.navbar--days'); // create button for each day and append to .navbar--days\n\nvar createDaysButton = function createDaysButton(dayData) {\n  var dayButtonCopy = daysButtonTemplate.cloneNode(true);\n  var dayButtonDiv = dayButtonCopy.querySelector('div');\n  dayButtonDiv.id = 'dayButton' + dayData.dayNumber;\n  dayButtonCopy.querySelector('.p--weekday').textContent = dayData.dayOfWeek;\n  dayButtonCopy.querySelector('.p--date').textContent = dayData.dayDateNumber; //default current tab set to day 1\n\n  if (dayData.dayNumber === 1) {\n    dayButtonDiv.classList.add('current');\n  }\n\n  daysBar.appendChild(dayButtonCopy);\n}; // STILL TO DO: CALCULATE HEIGHT TIMELINE\n\n\nvar constructTimeline = function constructTimeline(dayStart, dayEnd, dayDurationHours) {};\n\nvar constructStageColumns = function constructStageColumns(eventDays, eventStages) {\n  var columnNumber = eventStages.length; // set sass variable of column numbers in grid\n\n  if (eventStages.length > 0) {\n    document.documentElement.style.setProperty('--colNum', columnNumber);\n  } //grab template\n\n\n  eventStages.map(function (stage) {\n    var stageColumnCopy = stageColumnTemplate.cloneNode(true);\n    var columnDiv = stageColumnCopy.querySelector('.column--stage');\n    columnDiv.id = 'column' + stage.replace(/\\s/g, '');\n    stageColumnCopy.querySelector('.p--stagetitle').textContent = stage;\n    programGrid.appendChild(stageColumnCopy); //for each stage display sessions\n  });\n  prepareColumnData(eventDays, eventStages);\n};\n\nvar prepareColumnData = function prepareColumnData(eventDays, eventStages) {\n  var sessionsFirstDay = eventSessions.filter(function (session) {\n    return session.sessionDate === eventDays[0].date;\n  });\n  console.log(sessionsFirstDay);\n  eventStages.map(function (stage) {\n    var sessionsByStage = sessionsFirstDay.filter(function (session) {\n      return session.sessionStage === stage;\n    }); // for each stage append session items\n\n    displaySessionsByStage(sessionsByStage);\n  });\n};\n\nvar displaySessionsByStage = function displaySessionsByStage(sessionsByStage) {\n  var sortedSessions = sortByTime(sessionsByStage);\n  console.log(sortedSessions);\n  sortedSessions.map(function (session) {\n    return createSessionCards(session);\n  });\n};\n\nvar sortByTime = function sortByTime(array) {\n  array.sort(function (a, b) {\n    if (a.sessionStartTime < b.sessionStartTime) {\n      return -1;\n    } else {\n      return 1;\n    }\n  });\n};\n\nvar createSessionCards = function createSessionCards(_ref5) {\n  var sessionID = _ref5.sessionID,\n      sessionTitle = _ref5.sessionTitle,\n      sessionDescription = _ref5.sessionDescription,\n      sessionSpeakers = _ref5.sessionSpeakers,\n      sessionDate = _ref5.sessionDate,\n      sessionStartTime = _ref5.sessionStartTime,\n      sessionEndTime = _ref5.sessionEndTime,\n      sessionStage = _ref5.sessionStage,\n      sessionTags = _ref5.sessionTags,\n      isBreak = _ref5.isBreak;\n  var sessionCardCopy = sessionCardTemplate.cloneNode(true);\n  var sessionItem = sessionCardCopy.querySelector('.session--item');\n  sessionItem.id = sessionID; // add session content\n\n  sessionCardCopy.querySelector('.session--title').textContent = sessionTitle;\n  sessionCardCopy.querySelector('.session--description').textContent = sessionDescription;\n  var durationDiv = sessionCardCopy.querySelector('.session--duration');\n  durationDiv.textContent = calculateSessionDuration(sessionDate, sessionStartTime, sessionEndTime);\n\n  if (!isBreak) {\n    durationDiv.style.marginTop = '18px'; // if there are speakers - for each speaker create avatar\n\n    sessionSpeakers.length > 0 && sessionSpeakers.map(function (sessionSpeaker) {\n      var speakerImg = createSpeakerAvatar(sessionSpeaker);\n      var speakerDiv = sessionCardCopy.querySelector('.session--speakers');\n      speakerDiv.appendChild(speakerImg);\n    }); // for each session tag add tag\n\n    sessionTags.length > 0 && sessionTags.map(function (sessionTag) {\n      var newTag = document.createElement('div');\n      newTag.classList.add('session--styletag');\n      newTag.innerHTML = sessionTag;\n      var tagsDiv = sessionCardCopy.querySelector('.session--tags');\n      tagsDiv.appendChild(newTag);\n    });\n  }\n\n  var parentID = '#column' + sessionStage.replace(/\\s/g, '');\n  var parentColumn = document.querySelector(parentID);\n  parentColumn.appendChild(sessionCardCopy);\n};\n\nvar createSpeakerAvatar = function createSpeakerAvatar(sessionSpeaker) {\n  var speakerData = speakers.find(function (speakerObj) {\n    return speakerObj.speakerName === sessionSpeaker;\n  });\n  var speakerAvatar = document.createElement('img');\n  speakerAvatar.src = speakerData.speakerImgURL;\n  speakerAvatar.classList.add('session--avatar');\n  return speakerAvatar;\n};\n\nvar calculateSessionDuration = function calculateSessionDuration(dayDate, startTime, endTime) {\n  var sessionStart = new Date(\"\".concat(dayDate, \", \").concat(startTime)); //convert to UTC format\n\n  var sessionEnd = new Date(\"\".concat(dayDate, \", \").concat(endTime));\n  var totalMins = Math.floor((sessionEnd - sessionStart) / 60000);\n  var durationHrs = Math.floor(totalMins / 60);\n  var durationMin = totalMins - durationHrs * 60;\n  return \"\".concat(durationHrs, \"h\").concat(durationMin, \"m\");\n}; // EVENT LISTENERS\n\n\ndocument.addEventListener('click', function (event) {\n  if (event.target.id === 'button--favouritelist') {\n    showFavouriteList();\n  }\n\n  if (event.target.classList.contains('icon--heartoutline')) {\n    addToFavouriteList(event.target);\n  }\n});\n\nvar showFavouriteList = function showFavouriteList() {\n  programGrid.innerHTML = '';\n  var favouriteSessions = favouriteList.map(function (favourite) {\n    return eventSessions.find(function (session) {\n      return session.sessionID === favourite;\n    });\n  });\n  console.log(favouriteList);\n  console.log(favouriteSessions); // replace programGrid entire innerHTML string\n  // add class grid--favouriteList to program--grid\n};\n\nvar addToFavouriteList = function addToFavouriteList(e) {\n  var addedSession = e.parentNode.id;\n  e.src = './images/heart_solid.svg';\n  favouriteList.push(addedSession);\n  localStorage.setItem('favouriteList', favouriteList);\n};\n\n//# sourceURL=webpack:///./src/js/program.js?");

/***/ })

/******/ });