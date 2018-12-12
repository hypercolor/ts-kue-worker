import * as kue from 'kue';
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
                var job = kue
                    .createQueue(config.connection)
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
export { Task };
//# sourceMappingURL=task.js.map