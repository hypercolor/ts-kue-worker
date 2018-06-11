import * as kue from 'kue'
import { ITaskType, Task } from './task'

export class TaskRouter {
  private static taskTypes: Array<ITaskType<any>> = []

  public static registerTask(taskType: ITaskType<any>) {
    this.taskTypes.push(taskType)
  }

  public static deserializeTask(job: kue.Job): Promise<Task> {
    if (job.type) {
      for (const taskType of this.taskTypes) {
        if (job.type === taskType.name) {
          return taskType.build(job.data)
        }
      }
    }

    return Promise.reject(new Error('Couldnt match task type: ' + job.type))
  }
}
