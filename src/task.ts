import { Job } from 'kue'
import * as kue from 'kue'
import { IKueWorkerConfig } from './kue-worker'

export interface ITaskClass {
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
    const config = (this.constructor as any).workerConfig
    if (!config) {
      return Promise.reject(
        new Error(
          'Worker config not set for task ' + this.constructor.name + ', was it registered with a KueWorkerSubmitter?'
        )
      )
    } else {
      return new Promise((resolve, reject) => {
        const job = kue
          .createQueue(config.connection)
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
              resolve(job)
            }
          })
      })
    }
  }
}
