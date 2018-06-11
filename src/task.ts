import * as kue from 'kue'
import { Job } from 'kue'

// export interface ITaskParams {
//   [key: string]: any;
// }

// TODO: CONVERT THIS TO CONFIG
const redisConfig = {
  redis: process.env.REDIS_URL,
}

export interface ITaskResult {
  success: boolean
  error?: any
  result: any
}

export interface ITaskType<T extends Task> {
  name: string
  new (params: any): T
}

export abstract class Task {
  public valid = false

  protected job?: Job

  public abstract get maxConcurrent(): number

  public abstract workerRun(): Promise<ITaskResult>

  protected abstract get params(): any

  public submit() {
    if (this.valid) {
      // console.log('Submitting valid task: ' + JSON.stringify(task.serialize()));

      // console.log('Connecting to redis with config: ' + JSON.stringify(redisConfig));
      const jobQueue = kue.createQueue(redisConfig)

      return new Promise((resolve, reject) => {
        // this.sharedInstance.jobQueue = kue.createQueue();
        const job = jobQueue
          .create(this.constructor.name, this.serialize())
          .priority('normal')
          .attempts(1)
          .backoff(true)
          .removeOnComplete(false)
          .delay(0)
          .save((err: Error) => {
            if (err) {
              console.log('Error submitting task: ' + JSON.stringify(err))
              reject(err)
            } else {
              // console.log('Task submitted.');
              resolve(job)
            }
          })
      })
    } else {
      console.log('Warning, tried to submit an invalid task: ' + JSON.stringify(this))
      return Promise.reject({ code: 500, error: 'Invalid task: ' + JSON.stringify(this) })
    }
  }

  public serialize() {
    const json = this.params
    json.type = this.constructor.name
    return json
  }
}
