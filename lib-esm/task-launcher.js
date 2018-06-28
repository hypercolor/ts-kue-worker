import * as kue from 'kue';
export class TaskLauncher {
    serialize() {
        const json = this.params;
        json.type = this.constructor.name;
        return json;
    }
    submit(workerConfig) {
        const jobQueue = kue.createQueue(workerConfig);
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
//# sourceMappingURL=task-launcher.js.map