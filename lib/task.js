import * as kue from "kue";
var Task = /** @class */ (function () {
    function Task() {
    }
    Task.prototype.submit = function () {
        var _this = this;
        var jobQueue = kue.createQueue(Task.workerConfig.connection);
        return new Promise(function (resolve, reject) {
            // this.sharedInstance.jobQueue = kue.createQueue();
            var job = jobQueue
                .create(_this.constructor.name, _this.params)
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
    Task.maxConcurrent = 1;
    return Task;
}());
export { Task };
//# sourceMappingURL=task.js.map