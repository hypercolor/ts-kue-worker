import * as kue from 'kue';
var KueWorkerSubmitter = /** @class */ (function () {
    function KueWorkerSubmitter(config) {
        this.config = config;
    }
    KueWorkerSubmitter.getBrowserApp = function () {
        return kue.app;
    };
    KueWorkerSubmitter.prototype.registerTasks = function (taskTypes) {
        var _this = this;
        taskTypes.forEach(function (taskType) {
            _this.registerTask(taskType);
        });
    };
    KueWorkerSubmitter.prototype.registerTask = function (taskType) {
        taskType.workerConfig = this.config;
    };
    return KueWorkerSubmitter;
}());
export { KueWorkerSubmitter };
//# sourceMappingURL=kue-worker-submitter.js.map