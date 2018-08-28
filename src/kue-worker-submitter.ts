import * as express from 'express'
import * as kue from 'kue'
import { IKueWorkerConfig } from './kue-worker'
import { ITaskClass } from './task'

export class KueWorkerSubmitter {
  constructor(private config: IKueWorkerConfig) {}

  public static getBrowserApp(): express.Application {
    return kue.app
  }

  public registerTasks(taskTypes: Array<ITaskClass>) {
    taskTypes.forEach(taskType => {
      this.registerTask(taskType)
    })
  }

  public registerTask(taskType: ITaskClass) {
    taskType.workerConfig = this.config
  }
}
