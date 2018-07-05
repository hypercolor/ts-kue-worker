import * as kue from 'kue'
import { IKueWorkerConfig } from './kue-worker'
import { ITaskRunnerClass } from './task-runner'

export abstract class TaskLauncher {
  protected abstract get params(): any

  public abstract get runner(): ITaskRunnerClass

  public submit(workerConfig: IKueWorkerConfig) {
    const jobQueue = kue.createQueue(workerConfig.connection)

    return new Promise((resolve, reject) => {
      // this.sharedInstance.jobQueue = kue.createQueue();
      const job = jobQueue
        .create(this.runner.name, this.params)
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
