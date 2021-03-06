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
/*! exports provided: KueWorker, Task, KueWorkerSubmitter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_kue_worker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/kue-worker */ "./src/kue-worker.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "KueWorker", function() { return _src_kue_worker__WEBPACK_IMPORTED_MODULE_0__["KueWorker"]; });

/* harmony import */ var _src_task__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/task */ "./src/task.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Task", function() { return _src_task__WEBPACK_IMPORTED_MODULE_1__["Task"]; });

/* harmony import */ var _src_kue_worker_submitter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/kue-worker-submitter */ "./src/kue-worker-submitter.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "KueWorkerSubmitter", function() { return _src_kue_worker_submitter__WEBPACK_IMPORTED_MODULE_2__["KueWorkerSubmitter"]; });






/***/ }),

/***/ "./src/kue-worker-submitter.ts":
/*!*************************************!*\
  !*** ./src/kue-worker-submitter.ts ***!
  \*************************************/
/*! exports provided: KueWorkerSubmitter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KueWorkerSubmitter", function() { return KueWorkerSubmitter; });
/* harmony import */ var kue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! kue */ "kue");
/* harmony import */ var kue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(kue__WEBPACK_IMPORTED_MODULE_0__);

var KueWorkerSubmitter = /** @class */ (function () {
    function KueWorkerSubmitter(config) {
        this.config = config;
    }
    KueWorkerSubmitter.prototype.getBrowserApp = function () {
        // create a queue to force kue to set its global app variable to use our connection params :/
        kue__WEBPACK_IMPORTED_MODULE_0__["createQueue"](this.config.connection);
        return kue__WEBPACK_IMPORTED_MODULE_0__["app"];
    };
    KueWorkerSubmitter.prototype.registerTasksForSubmitting = function (taskTypes) {
        var _this = this;
        taskTypes.forEach(function (taskType) {
            _this.registerTaskForSubmitting(taskType);
        });
        return this;
    };
    KueWorkerSubmitter.prototype.registerTaskForSubmitting = function (taskType) {
        taskType.workerConfig = this.config;
        return this;
    };
    return KueWorkerSubmitter;
}());



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
            console.error('KueWorker: There was an error in the main queue!');
            console.error(err);
            console.error(err.stack);
        });
    }
    KueWorker.prototype.registerTasksForProcessing = function (taskTypes, successCallback, failCallback) {
        var _this = this;
        taskTypes.forEach(function (taskType) {
            _this.registerTaskForProcessing(taskType, successCallback, failCallback);
        });
    };
    KueWorker.prototype.registerTaskForProcessing = function (taskType, successCallback, failCallback) {
        _task_router__WEBPACK_IMPORTED_MODULE_1__["TaskRouter"].registerTask(taskType);
        taskType.workerConfig = this.config;
        this.jobQueue.process(taskType.name, taskType.maxConcurrent, function (job, done) {
            var start = new Date().getTime();
            var task;
            _task_router__WEBPACK_IMPORTED_MODULE_1__["TaskRouter"].deserializeTask(job)
                .then(function (t) {
                task = t;
                return task.doTaskWork();
            })
                .then(function (result) {
                if (result && result.error) {
                    console.log('Job ' + task.constructor.name + ' (' + job.id + ') error: ' + JSON.stringify(result.error));
                    job.remove();
                    done(result.error);
                }
                else {
                    var msg = task.constructor.name + '[' + job.id + '] ' + (new Date().getTime() - start) + ' ms';
                    if (result && result.message) {
                        msg += ': ' + result.message;
                    }
                    console.log(msg);
                    job.remove();
                    if (successCallback) {
                        successCallback(task, result);
                    }
                    done();
                }
            })
                .catch(function (err) {
                console.log('Job ' + task.constructor.name + ' (' + job.id + ') error: ', err);
                job.remove();
                if (failCallback) {
                    failCallback(task, err);
                }
                done(err);
            });
        });
    };
    return KueWorker;
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

/***/ "./src/task.ts":
/*!*********************!*\
  !*** ./src/task.ts ***!
  \*********************/
/*! exports provided: Task */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Task", function() { return Task; });
/* harmony import */ var kue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! kue */ "kue");
/* harmony import */ var kue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(kue__WEBPACK_IMPORTED_MODULE_0__);

var Task = /** @class */ (function () {
    function Task() {
    }
    Task.prototype.submit = function () {
        var _this = this;
        var config = this.constructor.workerConfig;
        if (!config) {
            return Promise.reject(new Error('Worker config not set for task ' + this.constructor.name + ', was it registered with a KueWorkerSubmitter?'));
        }
        else {
            return new Promise(function (resolve, reject) {
                var job = kue__WEBPACK_IMPORTED_MODULE_0__["createQueue"](config.connection)
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
                        resolve(job);
                    }
                });
            });
        }
    };
    Task.maxConcurrent = 1;
    return Task;
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