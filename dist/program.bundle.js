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
eval("\n\nvar programSettings = [];\nvar eventSessions = []; //templates\n\nvar daysButtonTemplate = document.querySelector('#daysButtonTemplate').content;\n\nwindow.onload = function () {\n  //get all programSettings from JSON\n  fetch('/src/js/programSettings.json').then(function (res) {\n    return res.json();\n  }).then(function (programSettings) {\n    programSettings = programSettings;\n    console.log(programSettings);\n    fetchEventSessions(programSettings.eventID);\n    constructDaysBar(programSettings.eventDays);\n  });\n};\n\nvar fetchEventSessions = function fetchEventSessions(eventID) {\n  console.log(eventID); // get the right program sessions for this event\n\n  fetch('/src/js/programSessions.json').then(function (res) {\n    return res.json();\n  }).then(function (programSessions) {\n    var eventProgram = programSessions.find(function (event) {\n      return event.eventID === eventID;\n    });\n    eventSessions = eventProgram.eventSessions;\n    console.log(eventSessions);\n  });\n};\n\nvar constructDaysBar = function constructDaysBar(eventDays) {\n  eventDays.map(function (day, index) {\n    var dayNumber = index + 1;\n    var dayStart = new Date(\"\".concat(day.date, \", \").concat(day.startTime)); //conver to UTC format\n\n    var dayEnd = new Date(\"\".concat(day.date, \", \").concat(day.endTime));\n    var dayDurationHours = (dayEnd.getTime() - dayStart.getTime()) / (1000 * 3600); //number of sections to create vertical timeline\n\n    var dayDateNumber = dayStart.getDate();\n    var abbrOptions = {\n      weekday: 'short'\n    };\n    var dayOfWeek = new Intl.DateTimeFormat('en-US', abbrOptions).format(dayStart);\n    var dayData = {\n      dayNumber: dayNumber,\n      dayDurationHours: dayDurationHours,\n      dayDateNumber: dayDateNumber,\n      dayOfWeek: dayOfWeek\n    };\n    console.log(dayData);\n    createDaysButton(dayData);\n  }); // constructTimelineColumn()\n};\n\nvar daysBar = document.querySelector('.navbar--days'); // create button for each day and append to .navbar--days\n\nvar createDaysButton = function createDaysButton(dayData) {\n  var dayButtonCopy = daysButtonTemplate.cloneNode(true);\n  var dayButtonDiv = dayButtonCopy.querySelector('div');\n  console.log(dayButtonCopy);\n  console.log(dayButtonDiv);\n  dayButtonDiv.id = 'dayButton' + dayData.dayNumber;\n  dayButtonCopy.querySelector('.p--weekday').textContent = dayData.dayOfWeek;\n  dayButtonCopy.querySelector('.p--date').textContent = dayData.dayDateNumber;\n\n  if (dayData.dayNumber === 1) {\n    dayButtonDiv.classList.add('current');\n  }\n\n  daysBar.appendChild(dayButtonCopy);\n};\n\nvar dayOnclickHandler = function dayOnclickHandler() {//get class of current has border bottom\n}; // render fixed timeline column in grid\n// create grid column for each stage api: programSettings/eventStages array\n// for each column, map through all sessions and filter by stage, create a grid item for each.\n\n//# sourceURL=webpack:///./src/js/program.js?");

/***/ })

/******/ });