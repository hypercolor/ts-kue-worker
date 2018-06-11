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
/*! exports provided: KueWorker, Task */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_kue_worker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/kue-worker */ "./src/kue-worker.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "KueWorker", function() { return _src_kue_worker__WEBPACK_IMPORTED_MODULE_0__["KueWorker"]; });

/* harmony import */ var _src_task__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/task */ "./src/task.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Task", function() { return _src_task__WEBPACK_IMPORTED_MODULE_1__["Task"]; });





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


var redisConfig = {
    redis: process.env.REDIS_URL,
};
var KueWorker = /** @class */ (function () {
    function KueWorker() {
        // console.log('Setting up Kue...');
        this.jobQueue = kue__WEBPACK_IMPORTED_MODULE_0__["createQueue"](redisConfig);
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
    KueWorker.launchBrowser = function (expressApp) {
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
                return task.workerRun();
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
                    return taskType.build(job.data);
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

// export interface ITaskParams {
//   [key: string]: any;
// }
// TODO: CONVERT THIS TO CONFIG
var redisConfig = {
    redis: process.env.REDIS_URL,
};
var Task = /** @class */ (function () {
    function Task() {
        this.valid = false;
    }
    Task.prototype.submit = function () {
        var _this = this;
        if (this.valid) {
            // console.log('Submitting valid task: ' + JSON.stringify(task.serialize()));
            // console.log('Connecting to redis with config: ' + JSON.stringify(redisConfig));
            var jobQueue_1 = kue__WEBPACK_IMPORTED_MODULE_0__["createQueue"](redisConfig);
            return new Promise(function (resolve, reject) {
                // this.sharedInstance.jobQueue = kue.createQueue();
                var job = jobQueue_1
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
        }
        else {
            console.log('Warning, tried to submit an invalid task: ' + JSON.stringify(this));
            return Promise.reject({ code: 500, error: 'Invalid task: ' + JSON.stringify(this) });
        }
    };
    Task.prototype.serialize = function () {
        var json = this.serializedParams;
        json.type = this.constructor.name;
        return json;
    };
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