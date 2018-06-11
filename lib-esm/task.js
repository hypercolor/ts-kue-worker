import * as kue from 'kue';
// export interface ITaskParams {
//   [key: string]: any;
// }
// TODO: CONVERT THIS TO CONFIG
const redisConfig = {
    redis: process.env.REDIS_URL,
};
export class Task {
    constructor() {
        this.valid = false;
        // public serialize() {
        //   const json = this.params
        //   json.type = this.constructor.name
        //   return json
        // }
    }
    // protected abstract get params(): any
    submit() {
        if (this.valid) {
            // console.log('Submitting valid task: ' + JSON.stringify(task.serialize()));
            // console.log('Connecting to redis with config: ' + JSON.stringify(redisConfig));
            const jobQueue = kue.createQueue(redisConfig);
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
        else {
            console.log('Warning, tried to submit an invalid task: ' + JSON.stringify(this));
            return Promise.reject({ code: 500, error: 'Invalid task: ' + JSON.stringify(this) });
        }
    }
}
//# sourceMappingURL=task.js.map