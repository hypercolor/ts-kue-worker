import * as kue from 'kue'
import { ITaskRunnerClass, Task } from './task'

export class TaskRouter {
  private static taskTypes: Array<ITaskRunnerClass> = []

  public static registerTask(taskType: ITaskRunnerClass) {
    this.taskTypes.push(taskType)
  }

  public static deserializeTask(job: kue.Job): Promise<Task> {
    if (job.type) {
      for (const taskType of this.taskTypes) {
        if (job.type === taskType.name) {
          return taskType.deserialize(job.data)
        }
      }
    }

    return Promise.reject(new Error('Couldnt match task type: ' + job.type))
  }
}
