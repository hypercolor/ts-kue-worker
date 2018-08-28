import * as kue from 'kue'
import { Queue } from 'kue'
import { ITaskClass, Task } from './task'
import { TaskRouter } from './task-router'

export interface IKueWorkerConfig {
  connection: {
    redis: string
  }
}

export class KueWorker {
  public jobQueue: Queue

  constructor(public config: IKueWorkerConfig) {
    this.jobQueue = kue.createQueue(config.connection)

    this.jobQueue.watchStuckJobs(1000 * 10)

    // this.jobQueue.on('ready', function(){
    //   console.info('Queue is ready!');
    // });

    this.jobQueue.on('error', function(err: Error) {
      console.error('There was an error in the main queue!')
      console.error(err)
      console.error(err.stack)
    })
  }

  public registerTasks(taskTypes: Array<ITaskClass>) {
    taskTypes.forEach(taskType => {
      this.registerTask(taskType)
    })
  }

  public registerTask(taskType: ITaskClass) {
    TaskRouter.registerTask(taskType)

    taskType.workerConfig = this.config

    this.jobQueue.process(taskType.name, taskType.maxConcurrent, (job: kue.Job, done: kue.DoneCallback) => {
      const start = new Date().getTime()

      let task: Task

      TaskRouter.deserializeTask(job)
        .then(t => {
          task = t
          return task.doTaskWork()
        })
        .then(result => {
          if (result && result.error) {
            console.log('Job ' + task.constructor.name + ' (' + job.id + ') error: ' + JSON.stringify(result.error))
            job.remove()
            done(result.error)
          } else {
            let msg = task.constructor.name + '[' + job.id + '] ' + (new Date().getTime() - start) + ' ms'

            if (result && result.message) {
              msg += ': ' + result.message
            }
            console.log(msg)
            job.remove()
            done()
          }
        })
        .catch(err => {
          console.log('Job ' + task.constructor.name + ' (' + job.id + ') error: ', err)
          job.remove()
          done(err)
        })
    })
  }
}
