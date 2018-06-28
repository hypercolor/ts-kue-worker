(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(global, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading wasm modules
/******/ 	var installedWasmModules = {};
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
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/ 	// object with all compiled WebAssembly.Modules
/******/ 	__webpack_require__.w = {};
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/*! exports provided: KueWorker, TaskRunner, TaskLauncher */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_kue_worker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/kue-worker */ "./src/kue-worker.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "KueWorker", function() { return _src_kue_worker__WEBPACK_IMPORTED_MODULE_0__["KueWorker"]; });

/* harmony import */ var _src_task_runner__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/task-runner */ "./src/task-runner.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TaskRunner", function() { return _src_task_runner__WEBPACK_IMPORTED_MODULE_1__["TaskRunner"]; });

/* harmony import */ var _src_task_launcher__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/task-launcher */ "./src/task-launcher.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TaskLauncher", function() { return _src_task_launcher__WEBPACK_IMPORTED_MODULE_2__["TaskLauncher"]; });






/***/ }),

/***/ "./src/kue-worker.ts":
/*!***************************!*\
  !*** ./src/kue-worker.ts ***!
  \***************************/
/*! exports provided: KueWorker */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KueWorker", function() { return KueWorker; });
/* harmony import */ var kue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! kue */ "kue");
/* harmony import */ var kue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(kue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _task_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./task-router */ "./src/task-router.ts");


var KueWorker = /** @class */ (function () {
    function KueWorker(config) {
        this.config = config;
        this.jobQueue = kue__WEBPACK_IMPORTED_MODULE_0__["createQueue"](config.connection);
        this.jobQueue.watchStuckJobs(1000 * 10);
        // this.jobQueue.on('ready', function(){
        //   console.info('Queue is ready!');
        // });
        this.jobQueue.on('error', function (err) {
            console.error('There was an error in the main queue!');
            console.error(err);
            console.error(err.stack);
        });
    }
    KueWorker.mountBrowserApp = function (expressApp) {
        expressApp.use('/kue', kue__WEBPACK_IMPORTED_MODULE_0__["app"]);
    };
    KueWorker.prototype.registerTask = function (taskType) {
        _task_router__WEBPACK_IMPORTED_MODULE_1__["TaskRouter"].registerTask(taskType);
        this.jobQueue.process(taskType.name, taskType.maxConcurrent, function (job, done) {
            var start = new Date().getTime();
            var task;
            _task_router__WEBPACK_IMPORTED_MODULE_1__["TaskRouter"].deserializeTask(job)
                .then(function (t) {
                task = t;
                return task.run();
            })
                .then(function (result) {
                if (result.error) {
                    console.log('Job ' + task.constructor.name + ' (' + job.id + ') error: ' + JSON.stringify(result.error));
                    job.remove();
                    done(result.error);
                }
                else {
                    console.log('Processed job ' +
                        task.constructor.name +
                        ' (' +
                        job.id +
                        ') in ' +
                        (new Date().getTime() - start) +
                        ' ms.');
                    job.remove();
                    done();
                }
            })
                .catch(function (err) {
                console.log('Job ' + task.constructor.name + ' (' + job.id + ') error: ', err);
                job.remove();
                done(err);
            });
        });
    };
    return KueWorker;
}());



/***/ }),

/***/ "./src/task-launcher.ts":
/*!******************************!*\
  !*** ./src/task-launcher.ts ***!
  \******************************/
/*! exports provided: TaskLauncher */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TaskLauncher", function() { return TaskLauncher; });
/* harmony import */ var kue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! kue */ "kue");
/* harmony import */ var kue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(kue__WEBPACK_IMPORTED_MODULE_0__);

var TaskLauncher = /** @class */ (function () {
    function TaskLauncher() {
    }
    TaskLauncher.prototype.serialize = function () {
        var json = this.params;
        json.type = this.constructor.name;
        return json;
    };
    TaskLauncher.prototype.submit = function (workerConfig) {
        var _this = this;
        var jobQueue = kue__WEBPACK_IMPORTED_MODULE_0__["createQueue"](workerConfig);
        return new Promise(function (resolve, reject) {
            // this.sharedInstance.jobQueue = kue.createQueue();
            var job = jobQueue
                .create(_this.constructor.name, _this.serialize())
                .priority('normal')
                .attempts(1)
                .backoff(true)
                .removeOnComplete(false)
                .delay(0)
                .save(function (err) {
                if (err) {
                    console.log('Error submitting task: ' + JSON.stringify(err));
                    reject(err);
                }
                else {
                    // console.log('Task submitted.');
                    resolve(job);
                }
            });
        });
    };
    return TaskLauncher;
}());



/***/ }),

/***/ "./src/task-router.ts":
/*!****************************!*\
  !*** ./src/task-router.ts ***!
  \****************************/
/*! exports provided: TaskRouter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TaskRouter", function() { return TaskRouter; });
var TaskRouter = /** @class */ (function () {
    function TaskRouter() {
    }
    TaskRouter.registerTask = function (taskType) {
        this.taskTypes.push(taskType);
    };
    TaskRouter.deserializeTask = function (job) {
        if (job.type) {
            for (var _i = 0, _a = this.taskTypes; _i < _a.length; _i++) {
                var taskType = _a[_i];
                if (job.type === taskType.name) {
                    return taskType.deserialize(job.data);
                }
            }
        }
        return Promise.reject(new Error('Couldnt match task type: ' + job.type));
    };
    TaskRouter.taskTypes = [];
    return TaskRouter;
}());



/***/ }),

/***/ "./src/task-runner.ts":
/*!****************************!*\
  !*** ./src/task-runner.ts ***!
  \****************************/
/*! exports provided: TaskRunner */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TaskRunner", function() { return TaskRunner; });
var TaskRunner = /** @class */ (function () {
    function TaskRunner() {
    }
    return TaskRunner;
}());



/***/ }),

/***/ 0:
/*!************************!*\
  !*** multi ./index.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./index.ts */"./index.ts");


/***/ }),

/***/ "kue":
/*!**********************!*\
  !*** external "kue" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("kue");

/***/ })

/******/ });
});
//# sourceMappingURL=index.js.map