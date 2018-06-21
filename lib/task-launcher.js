import * as kue from 'kue';
// TODO: CONVERT THIS TO CONFIG
var redisConfig = {
    redis: process.env.REDIS_URL,
};
var TaskLauncher = /** @class */ (function () {
    function TaskLauncher() {
    }
    TaskLauncher.prototype.serialize = function () {
        var json = this.serializedParams;
        json.type = this.constructor.name;
        return json;
    };
    TaskLauncher.prototype.submit = function () {
        var _this = this;
        var jobQueue = kue.createQueue(redisConfig);
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
export { TaskLauncher };
//# sourceMappingURL=task-launcher.js.map