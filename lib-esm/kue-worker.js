import * as kue from 'kue';
import { TaskRouter } from './task-router';
export class KueWorkerConfig {
}
KueWorkerConfig.redisParams = {
    redis: 'redis://localhost:6379',
};
export class KueWorker {
    constructor(redisConfig) {
        // console.log('Setting up Kue...');
        this.jobQueue = kue.createQueue(KueWorkerConfig.redisParams);
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
    static mountBrowserApp(expressApp) {
        expressApp.use('/kue', kue.app);
    }
    registerTask(taskType) {
        TaskRouter.registerTask(taskType);
        this.jobQueue.process(taskType.name, taskType.maxConcurrent, (job, done) => {
            const start = new Date().getTime();
            let task;
            TaskRouter.deserializeTask(job)
                .then(t => {
                task = t;
                return task.run();
            })
                .then(result => {
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
                .catch(err => {
                console.log('Job ' + task.constructor.name + ' (' + job.id + ') error: ', err);
                job.remove();
                done(err);
            });
        });
    }
}
//# sourceMappingURL=kue-worker.js.map