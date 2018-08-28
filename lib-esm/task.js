import * as kue from 'kue';
export class Task {
    submit() {
        const config = this.constructor.workerConfig;
        if (!config) {
            return Promise.reject(new Error('Worker config not set for task ' + this.constructor.name + ', was it registered with a KueWorkerSubmitter?'));
        }
        else {
            return new Promise((resolve, reject) => {
                const job = kue.createQueue(config.connection)
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
                        resolve(job);
                    }
                });
            });
        }
    }
}
Task.maxConcurrent = 1;
//# sourceMappingURL=task.js.map