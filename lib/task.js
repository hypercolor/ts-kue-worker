import * as kue from 'kue';
// export interface ITaskParams {
//   [key: string]: any;
// }
// TODO: CONVERT THIS TO CONFIG
var redisConfig = {
    redis: process.env.REDIS_URL
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
            var jobQueue_1 = kue.createQueue(redisConfig);
            return new Promise(function (resolve, reject) {
                // this.sharedInstance.jobQueue = kue.createQueue();
                var job = jobQueue_1.create(_this.constructor.name, _this.serialize())
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
        var json = this.params;
        json.type = this.constructor.name;
        return json;
    };
    return Task;
}());
export { Task };
//# sourceMappingURL=task.js.map