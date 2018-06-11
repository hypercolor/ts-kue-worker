import * as kue from 'kue';
import { TaskRouter } from './task-router';
var redisConfig = {
    redis: process.env.REDIS_URL,
};
var KueWorker = /** @class */ (function () {
    function KueWorker() {
        // console.log('Setting up Kue...');
        this.jobQueue = kue.createQueue(redisConfig);
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
        expressApp.use('/kue', kue.app);
    };
    KueWorker.prototype.registerTask = function (taskType) {
        TaskRouter.registerTask(taskType);
        this.jobQueue.process(taskType.name, new taskType({}).maxConcurrent, function (job, done) {
            var task = TaskRouter.deserializeTask(job);
            var start = new Date().getTime();
            if (task) {
                // console.log('Deserialized task: ' + JSON.stringify(task.serialize()) + ' from job: ' + JSON.stringify(job));
                task
                    .workerRun()
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
            }
            else {
                console.log("Warning, couldn't deserialize task: " + JSON.stringify(job));
                job.remove();
                done(new Error("Couldn't deserialize task."));
            }
        });
    };
    return KueWorker;
}());
export { KueWorker };
//# sourceMappingURL=kue-worker.js.map