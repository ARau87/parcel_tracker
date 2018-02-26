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
/******/ 	return __webpack_require__(__webpack_require__.s = 76);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(8);
var isBuffer = __webpack_require__(16);

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);


// Check if a valid session for the current client exists
const checkLogin = function () {
    return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get('/login')
                 .then((response) => {
                    if(response && response.data && response.status === 200){
                        return {
                            username: response.data.email,
                            firstname: response.data.firstname,
                            lastname: response.data.lastname,
                            address: response.data.address,
                            postcode: response.data.postcode,
                            city: response.data.city,
                            admin: response.data.admin
                        };
                    }
                    else {
                        return null
                    }
                })
                .catch(err => {
                    return null;
                });
};
/* harmony export (immutable) */ __webpack_exports__["b"] = checkLogin;


const logout = function () {

    return __WEBPACK_IMPORTED_MODULE_0_axios___default()({
        method: 'get',
        url: '/logout',
        headers: {
            'Cache-Control': 'no-store'
        }

    });

};
/* harmony export (immutable) */ __webpack_exports__["i"] = logout;


const reload = function () {

    let baseUrl = document.referrer.split('/');
    baseUrl.splice(baseUrl.length-2, 2);

    window.location.href = baseUrl;

};
/* harmony export (immutable) */ __webpack_exports__["j"] = reload;


const loadAllParcels = function(){

    return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get('/v1/parcels/all');

};
/* harmony export (immutable) */ __webpack_exports__["g"] = loadAllParcels;


const loadAllParcelsAdmin = function(){

    return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post('/v1/parcels/all');

};
/* harmony export (immutable) */ __webpack_exports__["h"] = loadAllParcelsAdmin;


const getParcelDetails = function(trackingNr){

  return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get('/v1/parcel/' + trackingNr);

};
/* harmony export (immutable) */ __webpack_exports__["d"] = getParcelDetails;


const getParcelDetailsAdmin = function(trackingNr){

    return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post('/v1/parcel/' + trackingNr);

};
/* harmony export (immutable) */ __webpack_exports__["e"] = getParcelDetailsAdmin;


const addStep = function (trackingNr, step) {
    if(step && step.stepType && step.stepLocation && step.stepName){
        return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.put('/v1/parcel/'+ trackingNr +'/step', {
            stepName: step.stepName,
            stepType: step.stepType,
            stepLocation: step.stepLocation,
            stepDate: Date.now()
        });
    }
};
/* harmony export (immutable) */ __webpack_exports__["a"] = addStep;


const endParcel = async function (trackingNr) {

    await addStep(trackingNr, {
        stepName: 'Ihre Sendung wurde abgeschlossen!',
        stepType: 'type_end',
        stepLocation: ' ',
        stepDate: Date.now()
    });

    return await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post('/v1/parcel/'+ trackingNr +'/end');
};
/* harmony export (immutable) */ __webpack_exports__["c"] = endParcel;


const getParcelTracking = function (trackingNr) {

    return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get('/v1/parcel/status/' + trackingNr);
};
/* harmony export (immutable) */ __webpack_exports__["f"] = getParcelTracking;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__header__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__details__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__history__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__step__ = __webpack_require__(14);





/* harmony default export */ __webpack_exports__["a"] = ({
    'page-header': __WEBPACK_IMPORTED_MODULE_0__header__["a" /* default */],
    'parcel-details': __WEBPACK_IMPORTED_MODULE_1__details__["a" /* default */],
    'history': __WEBPACK_IMPORTED_MODULE_2__history__["a" /* default */],
    'step': __WEBPACK_IMPORTED_MODULE_3__step__["a" /* default */]
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(15);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(0);
var normalizeHeaderName = __webpack_require__(18);

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(10);
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(10);
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ }),
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),
/* 9 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(0);
var settle = __webpack_require__(19);
var buildURL = __webpack_require__(21);
var parseHeaders = __webpack_require__(22);
var isURLSameOrigin = __webpack_require__(23);
var createError = __webpack_require__(11);
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(24);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if (process.env.NODE_ENV !== 'test' &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(25);

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(20);

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
    name: 'step',
    props: ['details', 'type'],
    template: `
               <div class="step step-positive" v-if="type === 'type_start'">
                    <div class="step__icon">
                    
                        <i class="ion-android-archive"></i>
                    
                    </div>
                    <div class="step__details">
                        <div class="step__description">{{details.stepName}}</div>
                        <div class="step__description">{{details.stepLocation}}</div>
                        <div class="step__time">{{hours}}:{{minutes}}</div>
                        <div class="step__date">{{day}}.{{month}}.{{year}}</div>    
                    </div>
               </div>
               <div class="step step-positive" v-else-if="type === 'type_logistic'">
                    <div class="step__icon">
                    
                        <i class="ion-android-settings"></i>
                    
                    </div>
                    <div class="step__details">
                        <div class="step__description">{{details.stepName}}</div>
                        <div class="step__description">{{details.stepLocation}}</div>
                        <div class="step__time">{{hours}}:{{minutes}}</div>
                        <div class="step__date">{{day}}.{{month}}.{{year}}</div>    
                    </div>
               </div>
               
               <div class="step step-positive" v-else-if="type === 'type_ontheway'">
                    <div class="step__icon">
                    
                        <i class="ion-android-bus"></i>
                    
                    </div>
                    <div class="step__details">
                        <div class="step__description">{{details.stepName}}</div>
                        <div class="step__description">{{details.stepLocation}}</div>
                        <div class="step__time">{{hours}}:{{minutes}}</div>
                        <div class="step__date">{{day}}.{{month}}.{{year}}</div>    
                    </div>
               </div>
               
               <div class="step  step-negative" v-else-if="type === 'type_notmet'">
                    <div class="step__icon">
                    
                        <i class="ion-android-close"></i>
                    
                    </div>
                    <div class="step__details">
                        <div class="step__description">{{details.stepName}}</div>
                        <div class="step__description">{{details.stepLocation}}</div>
                        <div class="step__time">{{hours}}:{{minutes}}</div>
                        <div class="step__date">{{day}}.{{month}}.{{year}}</div>    
                    </div>
               </div>
               <div class="step step-positive" v-else-if="type === 'type_shop'">
                    <div class="step__icon">
                    
                        <i class="ion-android-expand"></i>
                    
                    </div>
                    <div class="step__details">
                        <div class="step__description">{{details.stepName}}</div>
                        <div class="step__description">{{details.stepLocation}}</div>
                        <div class="step__time">{{hours}}:{{minutes}}</div>
                        <div class="step__date">{{day}}.{{month}}.{{year}}</div>    
                    </div>
               </div>
               <div class="step step-positive" v-else-if="type === 'type_end'">
                    <div class="step__icon">
                    
                        <i class="ion-android-done"></i>
                    
                    </div>
                    <div class="step__details">
                        <div class="step__description">{{details.stepName}}</div>
                        <div class="step__description">{{details.stepLocation}}</div>
                        <div class="step__time">{{hours}}:{{minutes}}</div>
                        <div class="step__date">{{day}}.{{month}}.{{year}}</div>    
                    </div>
               </div>
              `,
    computed: {
        date: function () {
          return new Date(this.details.stepDate);
        },

        day: function(){
            return this.date.getDate();
        },
        month: function(){
            return this.date.getMonth()+1;
        },
        year: function() {
            return this.date.getFullYear();
        },
        hours: function() {
            return this.date.getHours()+1;
        },
        minutes: function() {
            return this.date.getMinutes();
        }

    }
});

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var bind = __webpack_require__(8);
var Axios = __webpack_require__(17);
var defaults = __webpack_require__(4);

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(13);
axios.CancelToken = __webpack_require__(31);
axios.isCancel = __webpack_require__(12);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(32);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),
/* 16 */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(4);
var utils = __webpack_require__(0);
var InterceptorManager = __webpack_require__(26);
var dispatchRequest = __webpack_require__(27);

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, {method: 'get'}, this.defaults, config);
  config.method = config.method.toLowerCase();

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(11);

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request;
  error.response = response;
  return error;
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var transformData = __webpack_require__(28);
var isCancel = __webpack_require__(12);
var defaults = __webpack_require__(4);
var isAbsoluteURL = __webpack_require__(29);
var combineURLs = __webpack_require__(30);

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(13);

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_methods__ = __webpack_require__(1);



/* harmony default export */ __webpack_exports__["a"] = ({
    name: 'page-header',
    props: [
        'loggedin',
        'username',
        'admin',
        'application'
    ],
    template: `
          
            <header class="pageheader container" v-if="application">
                    <div class="pageheader__logo col-4">Parcel Tracker</div>
        
                    <nav class="pageheader__nav col-8">
                        <router-link class="nav__link" to="/">Home</router-link>
                        <router-link class="nav__link" to="/login">Login</router-link>
                        <router-link class="nav__link" to="/register">Registrierung</router-link>
                        <router-link class="nav__link" v-if="loggedin" to="/dashboard">Übersicht</router-link>
                        <button class="nav__button button-primary" v-if="admin" @click.prevent="gotoAdminPage">Admin</button>
                        <button class="nav__button button-primary" v-if="loggedin" @click.prevent="logout">Logout</button>
                    </nav>
                          
                    <div class="pageheader__burger col-8">
                        <i @click.preventt="mobileNav" class="ion-navicon-round pageheader__burger__icon"></i>
                    </div>  
            </header>
            <header class="pageheader container" v-else>
                    <div class="pageheader__logo col-4">Parcel Tracker</div>
        
                    <nav class="pageheader__nav col-8">
                        <router-link class="nav__link" v-if="loggedin" to="/dashboard">Übersicht</router-link>
                        <button class="nav__button" v-if="loggedin" @click.prevent="logout">Logout</button>
                    </nav>
                    
                    <div class="pageheader__burger col-8">
                        <i @click.prevent="mobileNav" class="ion-navicon-round pageheader__burger__icon"></i>
                    </div>
                            
            </header>
    
    `,
    methods: {
        logout: function(){
           Object(__WEBPACK_IMPORTED_MODULE_0__common_methods__["i" /* logout */])().then(() => this.$emit('logout'));
        },
        gotoAdminPage: function () {
            let adminUrl = window.location.protocol + '//' + window.location.host + '/admin';
            window.location.href = adminUrl;
        },
        mobileNav: function () {
            this.$emit('toggle-navbar');
            console.log(this.application);
            if(this.application){
                this.$router.push('/mobile/nav/app');
            }
            else {
                this.$router.push('/mobile/nav/admin');
            }
        }
    }
});

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
    name: 'parcel-details',
    props: ['parcel', 'type'],
    template: `
                           <div class="details" v-if="type === 'receiver'">
                                <h5>Empfänger</h5>
                                <div class="details__firstname">{{parcel.toFirstName}}</div>
                                <div class="details__name">{{parcel.toName}}</div>
                                <div class="details__city">{{parcel.toCity}}</div>
                                <div class="details__postcode">{{parcel.toPostCode}}</div>
                                <div class="details__address">{{parcel.toAddress}}</div>
                            
                           </div>
                           <div class="details" v-else-if="type === 'sender'">
                                <h5>Sender</h5>
                                <div class="details__firstname">{{parcel.fromFirstName}}</div>
                                <div class="details__name">{{parcel.fromName}}</div>
                                <div class="details__city">{{parcel.fromCity}}</div>
                                <div class="details__postcode">{{parcel.fromPostCode}}</div>
                                <div class="details__address">{{parcel.fromAddress}}</div>
                            
                           </div>
                           <div class="details" v-else>
                            Error this template is not defined!!!
                           </div>
                           
    
              `
});

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__step__ = __webpack_require__(14);


/* harmony default export */ __webpack_exports__["a"] = ({
    components: {
      'step': __WEBPACK_IMPORTED_MODULE_0__step__["a" /* default */]
    },
    name: 'history',
    props: ['parcel'],
    template: `
                        <div class="history">
                            <div class="history__steps">
                                <h5>Sendungshistorie</h5>
                                
                                <div class="history__item" v-for="step in parcel.steps">
                                    <step :details="step" :type="step.stepType"></step>
                                </div>
                            
                            </div>
                            
                            <div class="history_nextstep" v-if="parcel.nextStep">
                                <h5>Nächste Station</h5>
                                
                                <div class="history__nextstep__item"">
                                    <div class="step">
                                        <step :details="parcel.nextStep" :type="parcel.nextStep.stepType"></step>
                                    </div>
                                </div>
                            
                            </div>
                        </div>
              `

});

/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_methods__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components__ = __webpack_require__(2);




const Login = {
    components: __WEBPACK_IMPORTED_MODULE_2__components__["a" /* default */],
    template: `
                <div class="page page__login">
                                  
                    <h1>Login</h1>
                    
                    <form class="login">
                        <div class="login__message" :style="messageStyle">{{message}}</div>
                        
                        <input class="login__input" v-model="email" placeholder="E-Mail" type="email">
                        <input class="login__input" v-model="password" placeholder="Passwort" type="password">
                        <button class="login__submit button-primary" @click.prevent="submit">Abschicken</button>
                    
                    </form>
                </div>
              `,
    mounted(){
        this.checkLogin()
            .then(data => {
                if(data && data.username){
                    this.isLoggedIn = true;
                    this.username = data.username;
                    this.$emit('logged-in');
                }
            });
    },
    data(){
        return {
            // Error and Information messages about the login form
            message: 'Bitte geben Sie ihr Anmeldedaten hier ein:',
            messageType: 100,

            // Login form models
            password: '',
            email: '',

            // Currently logged in?
            isLoggedIn: false,
            username: ''

        }
    },
    methods: {
        submit: function(){


            if(this.validateInput(this.email, this.password)){
                __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post('/login',{
                    email: this.email,
                    password: this.password
                })
                    .then((response) => {
                        if(response && response.status === 200){
                            this.message = 'Sie haben sich erfolgreich angemeldet';
                            this.messageType = 200;
                            this.$emit('login_successful');
                            setTimeout(() => {
                                this.$router.push({path: '/dashboard'});
                            }, 1000);
                        }
                    })
                    .catch((err) => {
                        console.error(err);
                        this.message = 'Benutzername oder Passwort sind inkorrekt!';
                        this.messageType = 400;
                    })
            }

        },
        validateInput: function(email, password) {
            //TODO: Validate if email is really an email by regex
            return true;
        },
        checkLogin: __WEBPACK_IMPORTED_MODULE_1__common_methods__["b" /* checkLogin */]
    },
    computed: {
        messageStyle: function(){
            if(this.messageType === 400){
                return {
                    color: '#f00'
                };
            }
            if(this.messageType === 200){
                return {
                    color: '#0a0'
                };
            }
            if(this.messageType === 100){
                return {};
            }
        }
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Login);

/***/ }),
/* 37 */,
/* 38 */,
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_methods__ = __webpack_require__(1);


const MobileNav = {

    template: `
                <div v-if="app" class="page page__menu">
                        <button class="menu__button button-exit" @click.prevent="exit">X</button>
                        <router-link class="menu__link" @click.native="leave" to="/">Home</router-link>
                        <router-link class="menu__link" @click.native="leave" to="/login">Login</router-link>
                        <router-link class="menu__link" @click.native="leave" to="/register">Registrierung</router-link>
                        <router-link class="menu__link" @click.native="leave" v-if="isLoggedIn" to="/dashboard">Übersicht</router-link>
                        <button class="menu__button" v-if="admin && isLoggedIn" @click.prevent="gotoAdminPage">Admin</button>
                        <button class="menu__button" v-if="isLoggedIn" @click.prevent="logout">Logout</button>
                </div>
                <div v-else class="page page__menu">
                        <button class="menu__button button-exit" @click.prevent="exit">X</button>
                        <router-link class="menu__link" @click.native="leave" to="/">Home</router-link>
                        <router-link class="menu__link" @click.native="leave" v-if="isLoggedIn" to="/dashboard">Übersicht</router-link>
                        <button class="menu__button" v-if="admin && isLoggedIn" @click.prevent="gotoAppPage">App</button>
                        <button class="menu__button" v-if="isLoggedIn" @click.prevent="logout">Logout</button>
                </div>
              `,
    methods: {
        logout: function(){
            this.$emit('toggle-navbar');
            Object(__WEBPACK_IMPORTED_MODULE_0__common_methods__["i" /* logout */])().then(() => this.$emit('logout'));
            this.$router.push('/');
        },
        gotoAdminPage: function () {
            this.$emit('toggle-navbar');
            let appUrl = window.location.protocol + '//' + window.location.host + '/admin';
            window.location.href = appUrl;
        },
        gotoAppPage: function () {
            this.$emit('toggle-navbar');
            let adminUrl = window.location.protocol + '//' + window.location.host;
            window.location.href = adminUrl;
        },
        checkLogin: __WEBPACK_IMPORTED_MODULE_0__common_methods__["b" /* checkLogin */],
        exit: function(){
            this.$emit('toggle-navbar');
            this.$router.push('/dashboard');
        },
        leave: function () {
            this.$emit('toggle-navbar');
        }
    },
    mounted(){

        if(this.$route.params.app === 'admin'){
            this.app = false;
        }

        this.checkLogin()
            .then(data => {
                if(data && data.username){
                    this.isLoggedIn = true;
                    this.username = data.username;
                    this.admin = data.admin;
                }
            });
    },
    data(){
        return {

            // Currently logged in?
            isLoggedIn: false,
            username: '',
            admin: false,
            app: true

        }
    }

}

/* harmony default export */ __webpack_exports__["a"] = (MobileNav);

/***/ }),
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__settings_adminRoutes__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_methods__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components__ = __webpack_require__(2);




const router = new VueRouter({
    relative: true,
    routes: __WEBPACK_IMPORTED_MODULE_0__settings_adminRoutes__["a" /* default */]
});


// The main application body
const adminApp =  new Vue({
    components: __WEBPACK_IMPORTED_MODULE_2__components__["a" /* default */] ,
    router,
    el: '#app',
    mounted(){

        Object(__WEBPACK_IMPORTED_MODULE_1__common_methods__["b" /* checkLogin */])()
            .then(data => {
                if(data && data.username){
                    this.isLoggedIn = true;
                    this.username = data.username;
                    this.isAdmin = data.admin;
                }
                else {
                    this.$router.push('/');
                }
            });
    },
    data(){
        return {

            isLoggedIn: false,
            username: '',
            isAdmin: false,
            navHidden: false
        }
    },
    methods: {
        logout: function(){
            this.isLoggedIn = false;
            this.username = '';
            this.isAdmin = false;
            this.$router.push('/');
        },
        checkLogin: function () {
            Object(__WEBPACK_IMPORTED_MODULE_1__common_methods__["b" /* checkLogin */])()
                .then(data => {
                    if(data && data.username){
                        this.isLoggedIn = true;
                        this.username = data.username;
                        this.isAdmin = data.admin;
                    }
                    else {
                        this.$router.push('/');
                    }
                });
        },
        toggleNav: function(){
            this.navHidden = !this.navHidden;
        }
    }
});


/***/ }),
/* 77 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_admin_admin_parcel__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_admin_admin_dashboard__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_admin_admin_home__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_login__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_navigation__ = __webpack_require__(39);







const adminRoutes = [
    //Index route
    {
        path: '/',
        component: __WEBPACK_IMPORTED_MODULE_2__pages_admin_admin_home__["a" /* default */]
    },
    {
        path: '/dashboard',
        component: __WEBPACK_IMPORTED_MODULE_1__pages_admin_admin_dashboard__["a" /* default */]
    },
    {
        path: '/parcel/:trackingNr',
        component: __WEBPACK_IMPORTED_MODULE_0__pages_admin_admin_parcel__["a" /* default */]
    },
    {
        path: '/mobile/nav/:app',
        component: __WEBPACK_IMPORTED_MODULE_4__pages_navigation__["a" /* default */]
    }

];
/* unused harmony export adminRoutes */


/* harmony default export */ __webpack_exports__["a"] = (adminRoutes);

/***/ }),
/* 78 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_methods__ = __webpack_require__(1);



const AdminParcel = {
    components: __WEBPACK_IMPORTED_MODULE_0__components__["a" /* default */],
    template: `
                <div class="page page__adminparcel">
                                    
                    <main>
                    
                        <h1>Paket - Sendungsnummer {{$route.params.trackingNr}}</h1>
                        
                        <div v-if="!ended" class="edit">
                            <h4 class="edit__head">Sendung ändern</h4>
                            
                            <div class="edit__addstep">
                                <h5 class="edit__addstep__head">Station hinzufügen</h5>
                                
                                <form class="edit__addstep__form">
                                
                                    <select class="edit__addstep__type" v-model="stepType">
                                        <option value="-1" selected="selected">Aktion...</option>
                                        <option v-if="!started" value="type_start">Sendung wurde aufgegeben</option>
                                        <option value="type_logistic">Paket im Logistikzentrum</option>
                                        <option value="type_notmet">Empfänger nicht angetroffen</option>
                                        <option value="type_ontheway">Sendung ist auf dem Weg nach</option>
                                        <option value="type_shop">Sendung ist im Paketshop</option>
                                    </select>
                                    
                                    <input type="text" v-model="stepLocation" placeholder="Standort der Sendung">
                                    
                                    <input type="text" v-model="stepName">
                                    
                                    <button class="button button-primary" @click.prevent="submit">Abschicken</button>
                                                             
                                </form>
                                
                            
                            </div> 
                            
                            <div class="edit__end">
                                <h5 class="edit__end__head">Sendung abschließen</h5>
                                
                                <form class="edit__end__form">
                               
                                    
                                    <button class="button button-primary" @click.prevent="endDelivery">Sendung abschließen</button>
                                                             
                                </form>
                                
                            
                            </div> 
                          
                            
                        
                        </div>
                        
                        <div class="details">
                            
                            <h4 class="details__head">Details</h4>
                            
                            <parcel-details :parcel="details" :type="'receiver'"></parcel-details>
                            <parcel-details :parcel="details" :type="'sender'"></parcel-details>
                            
                            <history :parcel="details"></history>
                        
                        </div>
                    
                    </main>
                    
                </div>
              `,
    mounted(){

        this.checkLogin()
            .then(data => {
                if(data && data.username){
                    this.isLoggedIn = true;
                    this.username = data.username;
                }
                else {
                    this.$router.push('/login');
                }
            });


        this.getParcelDetailsAdmin(this.$route.params.trackingNr)
            .then((response) => {
                if(response.status === 200 && response.data && response.data.parcel){

                    this.details = response.data.parcel;
                }
            });



    },
    data(){
        return {

            // Currently logged in?
            isLoggedIn: false,
            username: '',

            // Parcel details
            details: {},
            stepName: '',
            stepType: '',
            stepLocation: '',
            started: false,
            ended: false

        }
    },
    methods: {

        validateInput: (stepName, stepType, stepLocation) => {
            //TODO: Validate user input
            return true;
        },
        submit: function ()  {
            if(this.validateInput(this.stepName, this.stepType, this.stepLocation)){
                Object(__WEBPACK_IMPORTED_MODULE_1__common_methods__["a" /* addStep */])(this.details.trackingNr, {
                    stepName: this.stepName,
                    stepLocation: this.stepLocation,
                    stepType: this.stepType
                }).then((response) => {
                    if(response.status === 200){
                        window.location.reload();
                    }
                });
            }
        },
        endDelivery: function() {
            Object(__WEBPACK_IMPORTED_MODULE_1__common_methods__["c" /* endParcel */])(this.details.trackingNr).then((response) => {
                if(response.status === 200){
                    window.location.reload();
                }
            });
        },
        checkLogin: __WEBPACK_IMPORTED_MODULE_1__common_methods__["b" /* checkLogin */],
        getParcelDetailsAdmin: __WEBPACK_IMPORTED_MODULE_1__common_methods__["e" /* getParcelDetailsAdmin */],
    }
    ,
    computed: {

    },
    watch: {
        details: function(parcel){
            for(let step of parcel.steps){
                if(step.stepType == 'type_start'){
                    this.started = true;
                }
                if(step.stepType == 'type_end'){
                    this.ended = true;
                }
            }
            if(parcel.nextStep && parcel.nextStep.stepType == 'type_start'){
                this.started = true;
            }
        },
        stepType: function(val) {
            if(this.stepType && this.stepLocation){
                if(this.stepType == 'type_start'){
                    this.stepName = 'Das Packet wurde in ' + this.stepLocation + ' abgegeben!';
                }
                if(this.stepType == 'type_logistic'){
                    this.stepName = 'Das Packet ist im Logistikzentrum in ' + this.stepLocation + ' angekommen!';
                }
                if(this.stepType == 'type_notmet'){
                    this.stepName = 'Das Packet konnte nicht zugestellt werden!';
                }
                if(this.stepType == 'type_ontheway'){
                    this.stepName = 'Das Packet ist auf dem Weg nach ' + this.stepLocation;
                }
                if(this.stepType == 'type_shop'){
                    this.stepName = 'Das Packet ist im Packetshop ' + this.stepLocation + ' abgegben worden und zur Abholung bereit!';
                }
            }
        },
        stepLocation: function(val) {
            if(this.stepType && this.stepLocation){
                if(this.stepType == 'type_start'){
                    this.stepName = 'Das Packet wurde in ' + this.stepLocation + ' abgegeben!';
                }
                if(this.stepType == 'type_logistic'){
                    this.stepName = 'Das Packet ist im Logistikzentrum in ' + this.stepLocation + ' angekommen!';
                }
                if(this.stepType == 'type_notmet'){
                    this.stepName = 'Das Packet konnte nicht zugestellt werden!';
                }
                if(this.stepType == 'type_ontheway'){
                    this.stepName = 'Das Packet ist auf dem Weg nach ' + this.stepLocation;
                }
                if(this.stepType == 'type_shop'){
                    this.stepName = 'Das Packet ist im Packetshop ' + this.stepLocation + ' abgegben worden und zur Abholung bereit!';
                }
            }
        }
    }
}

/* harmony default export */ __webpack_exports__["a"] = (AdminParcel);

/***/ }),
/* 79 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_methods__ = __webpack_require__(1);



const AdminDashboard = {
    components: __WEBPACK_IMPORTED_MODULE_0__components__["a" /* default */],
    template: `
                <div class="page page__admindashboard">
                   
                    <main>
                    
                     <h1>Übersicht - Admin</h1>
                     
                     
                     <div class="parcels">
                        <h2>Offene Sendungen</h2>
                        <ul class="parcels__list">
                            <li class="parcels__list__item" v-for="parcel in openParcels">
                                <router-link class="parcel__link" :to="'/parcel/' + parcel.trackingNr">{{parcel.trackingNr}}</router-link>
                            </li>
                        </ul>
                         
                    </div>
                    
                    <div class="parcels">
                        <h2>Abgeschlossene Sendungen</h2>
                        <ul class="parcels__list">
                            <li class="parcels__list__item" v-for="parcel in arrivedParcels">
                                <router-link class="parcel__link" :to="'/parcel/' + parcel.trackingNr">{{parcel.trackingNr}}</router-link>
                            </li>
                        </ul>
                         
                    </div>
                    
                    
                    </main>
                    
                </div>
              `,
    mounted(){
        this.checkLogin()
            .then(data => {
                if(data && data.username){
                    this.isLoggedIn = true;
                    this.username = data.username;
                }
                else {
                    this.$router.push('/login');
                }
            });

        this.loadAllParcelsAdmin()
            .then((response) => {
                if(response.status === 200 && response.data && response.data.parcels){
                    this.parcels = response.data.parcels;
                }
            });
    },
    data(){
        return {
            // Error and Information messages about the login form
            message: 'Bitte geben Sie ihr Anmeldedaten hier ein:',
            messageType: 100,

            // Currently logged in?
            isLoggedIn: true,
            username: '',

            // Parcels
            parcels: []

        }
    },
    methods: {
        checkLogin: __WEBPACK_IMPORTED_MODULE_1__common_methods__["b" /* checkLogin */],
        loadAllParcelsAdmin: __WEBPACK_IMPORTED_MODULE_1__common_methods__["h" /* loadAllParcelsAdmin */]
    },
    computed: {
        messageStyle: function(){
            if(this.messageType === 400){
                return {
                    color: '#ff0000'
                };
            }
            if(this.messageType === 200){
                return {
                    color: '#0a0'
                };
            }
            if(this.messageType === 100){
                return {};
            }
        },
        openParcels: function () {
            return this.parcels.filter((parcel) => !parcel.arrived);
        },
        arrivedParcels: function () {
            return this.parcels.filter((parcel) => parcel.arrived);
        }

    }
}

/* harmony default export */ __webpack_exports__["a"] = (AdminDashboard);

/***/ }),
/* 80 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_methods__ = __webpack_require__(1);



const AdminHome = {
    components: __WEBPACK_IMPORTED_MODULE_0__components__["a" /* default */],
    template: `
                <div class="page page__adminhome">
                              
                    <h1>Admin Panel</h1>
                    
                </div>
              `,
    mounted(){
    },
    data(){
        return {

            // Currently logged in?
            isLoggedIn: true,
            username: ''

        }
    },
    methods: {
        reload: __WEBPACK_IMPORTED_MODULE_1__common_methods__["j" /* reload */]
    },
    computed: {
    }
}

/* harmony default export */ __webpack_exports__["a"] = (AdminHome);

/***/ })
/******/ ]);