import { Job } from 'kue'

// export interface ITaskParams {
//   [key: string]: any;
// }

export interface ITaskResult {
  success: boolean
  error?: any
  result?: any
}

export interface ITaskType {
  // name: string
  maxConcurrent: number
  deserialize(serializedParams: any): Promise<TaskRunner>
}

export abstract class TaskRunner {
  protected job?: Job

  public abstract run(): Promise<ITaskResult>
}
