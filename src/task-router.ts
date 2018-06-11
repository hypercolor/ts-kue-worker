import * as kue from 'kue'
import { ITaskType, Task } from './task'

export class TaskRouter {
  private static taskTypes: Array<ITaskType<any>> = []

  public static registerTask(taskType: ITaskType<any>) {
    this.taskTypes.push(taskType)
  }

  public static deserializeTask(job: kue.Job): Task | null {
    let task: Task | null = null

    if (job.type) {
      for (const taskType of this.taskTypes) {
        if (job.type === taskType.name) {
          task = new taskType(job.data)
          break
        }
      }
    }

    return task
  }
}
