import { Job } from 'kue'
import * as kue from 'kue'
import { IKueWorkerConfig } from './kue-worker'

export interface ITaskRunnerClass {
  name: string
  maxConcurrent: number
  workerConfig: IKueWorkerConfig
  deserialize(serializedParams: any): Promise<Task>
}

export abstract class Task {
  static maxConcurrent = 1

  static workerConfig: IKueWorkerConfig

  protected job?: Job

  public abstract serialize(): any

  public abstract doTaskWork(): Promise<any>

  public submit() {
    const jobQueue = kue.createQueue(Task.workerConfig.connection)

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
  }
}
