import * as kue from 'kue';
import { TaskRouter } from './task-router';
export class KueWorker {
    constructor(config) {
        this.config = config;
        this.jobQueue = kue.createQueue(config.connection);
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
    registerTasks(taskTypes) {
        taskTypes.forEach(taskType => {
            this.registerTask(taskType);
        });
    }
    registerTask(taskType) {
        TaskRouter.registerTask(taskType);
        taskType.workerConfig = this.config;
        this.jobQueue.process(taskType.name, taskType.maxConcurrent, (job, done) => {
            const start = new Date().getTime();
            let task;
            TaskRouter.deserializeTask(job)
                .then(t => {
                task = t;
                return task.doTaskWork();
            })
                .then(result => {
                if (result && result.error) {
                    console.log('Job ' + task.constructor.name + ' (' + job.id + ') error: ' + JSON.stringify(result.error));
                    job.remove();
                    done(result.error);
                }
                else {
                    let msg = task.constructor.name + '[' + job.id + '] ' + (new Date().getTime() - start) + ' ms';
                    if (result && result.message) {
                        msg += ': ' + result.message;
                    }
                    console.log(msg);
                    job.remove();
                    done();
                }
            })
                .catch(err => {
                console.log('Job ' + task.constructor.name + ' (' + job.id + ') error: ', err);
                job.remove();
                done(err);
            });
        });
    }
}
//# sourceMappingURL=kue-worker.js.map