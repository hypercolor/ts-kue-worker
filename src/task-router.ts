import * as kue from 'kue'
import { ITaskRunnerClass, TaskRunner } from './task-runner'

export class TaskRouter {
  private static taskTypes: Array<ITaskRunnerClass> = []

  public static registerTask(taskType: ITaskRunnerClass) {
    this.taskTypes.push(taskType)
  }

  public static deserializeTask(job: kue.Job): Promise<TaskRunner> {
    if (job.type) {
      for (const taskType of this.taskTypes) {
        if (job.type === taskType.constructor.name) {
          return taskType.deserialize(job.data)
        }
      }
    }

    return Promise.reject(new Error('Couldnt match task type: ' + job.type))
  }
}
