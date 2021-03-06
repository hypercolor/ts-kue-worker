import * as kue from 'kue';
import { TaskRouter } from './task-router';
var KueWorker = /** @class */ (function () {
    function KueWorker(config) {
        this.config = config;
        this.jobQueue = kue.createQueue(config.connection);
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
        TaskRouter.registerTask(taskType);
        taskType.workerConfig = this.config;
        this.jobQueue.process(taskType.name, taskType.maxConcurrent, function (job, done) {
            var start = new Date().getTime();
            var task;
            TaskRouter.deserializeTask(job)
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
export { KueWorker };
//# sourceMappingURL=kue-worker.js.map