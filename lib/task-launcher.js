import * as kue from 'kue';
var TaskLauncher = /** @class */ (function () {
    function TaskLauncher() {
    }
    TaskLauncher.prototype.submit = function (workerConfig) {
        var _this = this;
        var jobQueue = kue.createQueue(workerConfig.connection);
        return new Promise(function (resolve, reject) {
            // this.sharedInstance.jobQueue = kue.createQueue();
            var job = jobQueue
                .create(_this.runner.constructor.name, _this.params)
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
export { TaskLauncher };
//# sourceMappingURL=task-launcher.js.map