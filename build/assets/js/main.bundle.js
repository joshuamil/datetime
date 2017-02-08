/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var renderTime = exports.renderTime = function renderTime() {

  var now = new Date();
  var tt = "AM";
  var hh = now.getHours();
  var nn = "0" + now.getMinutes();

  if (now.getHours() > 12) {
    hh = now.getHours() - 12;
    tt = "PM";
  }

  document.querySelector('.time').innerHTML = hh + ":" + nn.substr(-2) + " " + tt;

  var doit = function doit() {
    renderTime();
  };

  setTimeout(doit, 1000);
};

var enableButtons = exports.enableButtons = function enableButtons() {

  // Enable previous/next functionality
  var tim = document.querySelector('.time');
  var tic = tim.cloneNode(true);
  tim.parentNode.replaceChild(tic, tim);
  tic.addEventListener('click', function (event) {
    tic.classList.toggle('large');
  });

  return true;
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*
 * Date Format 1.2.3
 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
 * MIT license
 *
 * Includes enhancements by Scott Trenda <scott.trenda.net>
 * and Kris Kowal <cixar.com/~kris.kowal/>
 *
 * Accepts a date, a mask, or a date and a mask.
 * Returns a formatted version of the given date.
 * The date defaults to the current date/time.
 * The mask defaults to dateFormat.masks.default.
 */

(function (global) {
  'use strict';

  var dateFormat = function () {
    var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZWN]|'[^']*'|'[^']*'/g;
    var timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g;
    var timezoneClip = /[^-+\dA-Z]/g;

    // Regexes and supporting functions are cached through closure
    return function (date, mask, utc, gmt) {

      // You can't provide utc if you skip other args (use the 'UTC:' mask prefix)
      if (arguments.length === 1 && kindOf(date) === 'string' && !/\d/.test(date)) {
        mask = date;
        date = undefined;
      }

      date = date || new Date();

      if (!(date instanceof Date)) {
        date = new Date(date);
      }

      if (isNaN(date)) {
        throw TypeError('Invalid date');
      }

      mask = String(dateFormat.masks[mask] || mask || dateFormat.masks['default']);

      // Allow setting the utc/gmt argument via the mask
      var maskSlice = mask.slice(0, 4);
      if (maskSlice === 'UTC:' || maskSlice === 'GMT:') {
        mask = mask.slice(4);
        utc = true;
        if (maskSlice === 'GMT:') {
          gmt = true;
        }
      }

      var _ = utc ? 'getUTC' : 'get';
      var d = date[_ + 'Date']();
      var D = date[_ + 'Day']();
      var m = date[_ + 'Month']();
      var y = date[_ + 'FullYear']();
      var H = date[_ + 'Hours']();
      var M = date[_ + 'Minutes']();
      var s = date[_ + 'Seconds']();
      var L = date[_ + 'Milliseconds']();
      var o = utc ? 0 : date.getTimezoneOffset();
      var W = getWeek(date);
      var N = getDayOfWeek(date);
      var flags = {
        d: d,
        dd: pad(d),
        ddd: dateFormat.i18n.dayNames[D],
        dddd: dateFormat.i18n.dayNames[D + 7],
        m: m + 1,
        mm: pad(m + 1),
        mmm: dateFormat.i18n.monthNames[m],
        mmmm: dateFormat.i18n.monthNames[m + 12],
        yy: String(y).slice(2),
        yyyy: y,
        h: H % 12 || 12,
        hh: pad(H % 12 || 12),
        H: H,
        HH: pad(H),
        M: M,
        MM: pad(M),
        s: s,
        ss: pad(s),
        l: pad(L, 3),
        L: pad(Math.round(L / 10)),
        t: H < 12 ? 'a' : 'p',
        tt: H < 12 ? 'am' : 'pm',
        T: H < 12 ? 'A' : 'P',
        TT: H < 12 ? 'AM' : 'PM',
        Z: gmt ? 'GMT' : utc ? 'UTC' : (String(date).match(timezone) || ['']).pop().replace(timezoneClip, ''),
        o: (o > 0 ? '-' : '+') + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
        S: ['th', 'st', 'nd', 'rd'][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10],
        W: W,
        N: N
      };

      return mask.replace(token, function (match) {
        if (match in flags) {
          return flags[match];
        }
        return match.slice(1, match.length - 1);
      });
    };
  }();

  dateFormat.masks = {
    'default': 'ddd mmm dd yyyy HH:MM:ss',
    'shortDate': 'm/d/yy',
    'mediumDate': 'mmm d, yyyy',
    'longDate': 'mmmm d, yyyy',
    'fullDate': 'dddd, mmmm d, yyyy',
    'shortTime': 'h:MM TT',
    'mediumTime': 'h:MM:ss TT',
    'longTime': 'h:MM:ss TT Z',
    'isoDate': 'yyyy-mm-dd',
    'isoTime': 'HH:MM:ss',
    'isoDateTime': 'yyyy-mm-dd\'T\'HH:MM:sso',
    'isoUtcDateTime': 'UTC:yyyy-mm-dd\'T\'HH:MM:ss\'Z\'',
    'expiresHeaderFormat': 'ddd, dd mmm yyyy HH:MM:ss Z'
  };

  // Internationalization strings
  dateFormat.i18n = {
    dayNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  };

  function pad(val, len) {
    val = String(val);
    len = len || 2;
    while (val.length < len) {
      val = '0' + val;
    }
    return val;
  }

  /**
   * Get the ISO 8601 week number
   * Based on comments from
   * http://techblog.procurios.nl/k/n618/news/view/33796/14863/Calculate-ISO-8601-week-and-year-in-javascript.html
   *
   * @param  {Object} `date`
   * @return {Number}
   */
  function getWeek(date) {
    // Remove time components of date
    var targetThursday = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    // Change date to Thursday same week
    targetThursday.setDate(targetThursday.getDate() - (targetThursday.getDay() + 6) % 7 + 3);

    // Take January 4th as it is always in week 1 (see ISO 8601)
    var firstThursday = new Date(targetThursday.getFullYear(), 0, 4);

    // Change date to Thursday same week
    firstThursday.setDate(firstThursday.getDate() - (firstThursday.getDay() + 6) % 7 + 3);

    // Check if daylight-saving-time-switch occured and correct for it
    var ds = targetThursday.getTimezoneOffset() - firstThursday.getTimezoneOffset();
    targetThursday.setHours(targetThursday.getHours() - ds);

    // Number of weeks between target Thursday and first Thursday
    var weekDiff = (targetThursday - firstThursday) / (86400000 * 7);
    return 1 + Math.floor(weekDiff);
  }

  /**
   * Get ISO-8601 numeric representation of the day of the week
   * 1 (for Monday) through 7 (for Sunday)
   * 
   * @param  {Object} `date`
   * @return {Number}
   */
  function getDayOfWeek(date) {
    var dow = date.getDay();
    if (dow === 0) {
      dow = 7;
    }
    return dow;
  }

  /**
   * kind-of shortcut
   * @param  {*} val
   * @return {String}
   */
  function kindOf(val) {
    if (val === null) {
      return 'null';
    }

    if (val === undefined) {
      return 'undefined';
    }

    if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) !== 'object') {
      return typeof val === 'undefined' ? 'undefined' : _typeof(val);
    }

    if (Array.isArray(val)) {
      return 'array';
    }

    return {}.toString.call(val).slice(8, -1).toLowerCase();
  };

  if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
      return dateFormat;
    }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
    module.exports = dateFormat;
  } else {
    global.dateFormat = dateFormat;
  }
})(undefined);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _clock = __webpack_require__(0);

var clock = _interopRequireWildcard(_clock);

var _dateformat = __webpack_require__(1);

var _dateformat2 = _interopRequireDefault(_dateformat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// Render the Calendar
var renderCalendar = function renderCalendar(mm, yy) {

	console.warn('ALRIGHT, HERE WE GO!');

	// HTML renderers
	var _html = '';
	var th = '';
	var tr = '';
	var td = '';
	var cls = '';
	var msg = '';
	var sty = '';
	var id = '';

	// Create current date object
	var now = new Date();

	// Defaults
	mm = mm === undefined ? now.getMonth() : mm;
	yy = yy === undefined ? now.getFullYear() : yy;

	console.log(mm + '-' + yy);

	// Create viewed date object
	var mon = new Date(yy, mm, 1);
	var yp = mon.getFullYear();
	var yn = mon.getFullYear();
	var prv = new Date(yp, mm - 1, 1);
	var nxt = new Date(yn, mm + 1, 1);

	// Date elements
	var m = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var d = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Saturday"];
	var ds = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	var n = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

	// Leap year
	if (now.getYear() % 4 === 0) {
		n[1] = 29;
	}

	// Get some important days
	var fdom = mon.getDay(); // First day of month
	var mwks = 6; // Weeks in month

	// Render Month
	document.querySelector('.year').innerHTML = mon.getFullYear();
	document.querySelector('.month').innerHTML = m[mon.getMonth()];

	// Clear view
	var h = document.querySelector('#calendar > thead');
	var b = document.querySelector('#calendar > tbody');

	while (h.hasChildNodes()) {
		h.removeChild(h.lastChild);
	}

	while (b.hasChildNodes()) {
		b.removeChild(b.lastChild);
	}

	// Render Days of Week
	tr = document.createElement('tr');
	for (var j = 0; j < d.length; j++) {
		th = document.createElement('th');
		th.innerHTML = d[j];
		tr.appendChild(th);
	}
	h.appendChild(tr);

	// Render days
	var dow = 0;
	var first = 0;
	var last = 0;
	var max = 6;
	for (var i = 0; i >= last && i <= max; i++) {

		console.log(i);

		tr = document.createElement('tr');

		for (var _j = 0; _j < d.length; _j++) {

			cls = '';
			msg = '';
			sty = '';
			id = '';

			// Determine if we have reached the first of the month

			console.log('range: ' + first + ' - ' + dow + ' - ' + n[mon.getMonth()]);

			if (first >= n[mon.getMonth()]) {
				dow = 0;

				console.log('zeroed out');
			} else if (dow > 0 && first > 0 || _j === fdom) {
				dow++;
				first++;
			}

			// Get last day of month
			if (dow === n[mon.getMonth()]) {
				last = n[mon.getMonth()];
			}

			// Set class
			if (cls.length === 0) {
				if (dow === now.getDate() && now.getMonth() === mon.getMonth() && now.getFullYear() === mon.getFullYear()) {
					cls = "today";
				} else if (_j === 0 || _j === 6) {
					cls = "weekend";
				} else {
					cls = '';
				}
			}

			// Set ID
			id = "cell_" + i + '' + _j + '' + dow;

			// Set full date for this cell
			var dt = new Date(mon.getFullYear(), mon.getMonth(), dow);

			// Set day of week for this cell
			var day = ds[_j];

			td = document.createElement('td');

			// Render HTML
			if (dow === 0) {

				td.setAttribute('class', 'empty');
				td.setAttribute('data-dow', _j);
				td.setAttribute('data-day', day);
				td.innerHTML = '<div>&nbsp;</div>';
			} else if (msg.length > 0) {

				td.setAttribute('class', cls);
				td.setAttribute('id', id);
				td.setAttribute('data-dow', dow);
				td.setAttribute('data-day', day);
				td.setAttribute('data-full-date', (0, _dateformat2.default)(dt, "yyyy-MM-dd"));

				_html = '<div style="' + sty + '"><div class="num">' + dow + '</div><div class="day">' + day + '</div><div class="content">' + msg + '</div></div>';

				td.innerHTML = _html;
			} else {

				td.setAttribute('class', cls);
				td.setAttribute('id', id);
				td.setAttribute('data-dow', dow);
				td.setAttribute('data-day', day);
				td.setAttribute('data-full-date', (0, _dateformat2.default)(dt, "yyyy-MM-dd"));

				_html = '<div><div class="num">' + dow + '</div><div class="day">' + day + '</div></div>';

				td.innerHTML = _html;
			}

			tr.appendChild(td);
		}

		b.append(tr);
	}

	// Enable previous/next functionality
	var lst = document.querySelector('#last');
	var lsc = lst.cloneNode(true);
	lst.parentNode.replaceChild(lsc, lst);
	lsc.addEventListener('click', function (event) {
		console.log('A');
		renderCalendar(prv.getMonth(), prv.getFullYear());
	});

	var cur = document.querySelector('#current');
	var cuc = cur.cloneNode(true);
	cur.parentNode.replaceChild(cuc, cur);
	cuc.addEventListener('click', function (event) {
		console.log('B');
		renderCalendar(now.getMonth(), now.getFullYear());
	});

	var nex = document.querySelector('#next');
	var nec = nex.cloneNode(true);
	nex.parentNode.replaceChild(nec, nex);
	nec.addEventListener('click', function (event) {
		console.log('C');
		renderCalendar(nxt.getMonth(), nxt.getFullYear());
	});

	// Enable links and current day panel loading
	var dayLinks = document.querySelectorAll('.calendar-frame .calendar td>div');
	Array.from(dayLinks).forEach(function (link) {
		link.addEventListener('click', function (event) {

			var el = link;

			var cx = document.createElement('a');
			cx.setAttribute('href', '#');
			cx.setAttribute('class', 'close fa fa-2x fa-close');

			var fd = document.querySelector('.full-day');

			var html = el.cloneNode(true);
			html.appendChild(cx);
			html.addEventListener('click', function () {
				fd.classList.toggle('active');
			});

			fd.classList.toggle('active');
			fd.innerHTML = '';
			fd.appendChild(html);
		});
	});
};

// Initialization
var init = function init() {

	// Render the calendar
	renderCalendar();

	// Render the clock
	clock.renderTime();
	clock.enableButtons();
};

// Call init when the DOM is loaded
document.addEventListener('DOMContentLoaded', function (event) {
	init();
});

/***/ })
/******/ ]);
//# sourceMappingURL=main.bundle.js.map