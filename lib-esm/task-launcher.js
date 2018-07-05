import * as kue from 'kue';
export class TaskLauncher {
    submit(workerConfig) {
        const jobQueue = kue.createQueue(workerConfig.connection);
        return new Promise((resolve, reject) => {
            // this.sharedInstance.jobQueue = kue.createQueue();
            const job = jobQueue
                .create(this.runner.constructor.name, this.params)
                .priority('normal')
                .attempts(1)
                .backoff(true)
                .removeOnComplete(false)
                .delay(0)
                .save((err) => {
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
}
//# sourceMappingURL=task-launcher.js.map