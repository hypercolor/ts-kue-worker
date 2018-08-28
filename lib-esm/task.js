import * as kue from 'kue';
export class Task {
    submit() {
        const jobQueue = kue.createQueue(Task.workerConfig.connection);
        return new Promise((resolve, reject) => {
            // this.sharedInstance.jobQueue = kue.createQueue();
            const job = jobQueue
                .create(this.constructor.name, this.serialize())
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
Task.maxConcurrent = 1;
//# sourceMappingURL=task.js.map