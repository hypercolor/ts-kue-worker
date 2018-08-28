import * as express from 'express'
import * as kue from 'kue'
import { IKueWorkerConfig } from './kue-worker'
import { ITaskClass } from './task'

export class KueWorkerSubmitter {
  constructor(private config: IKueWorkerConfig) {}

  public getBrowserApp(): express.Application {
    // create a queue to force kue to set its global app variable to use our connection params :/
    kue.createQueue(this.config.connection)

    return kue.app
  }

  public registerTasks(taskTypes: Array<ITaskClass>) {
    taskTypes.forEach(taskType => {
      this.registerTask(taskType)
    })
    return this
  }

  public registerTask(taskType: ITaskClass) {
    taskType.workerConfig = this.config
    return this
  }
}
