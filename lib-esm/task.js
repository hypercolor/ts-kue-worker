import * as kue from 'kue';
// export interface ITaskParams {
//   [key: string]: any;
// }
// TODO: CONVERT THIS TO CONFIG
const redisConfig = {
    redis: process.env.REDIS_URL,
};
export class Task {
    submit() {
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
    serialize() {
        const json = this.serializedParams;
        json.type = this.constructor.name;
        return json;
    }
}
//# sourceMappingURL=task.js.map