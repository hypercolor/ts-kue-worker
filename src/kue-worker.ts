import * as express from 'express'
import * as kue from 'kue'
import { Queue } from 'kue'
import { ITaskType, Task } from './task'
import { TaskRouter } from './task-router'

const redisConfig = {
  redis: process.env.REDIS_URL,
}

export class KueWorker {
  // private static sharedInstance: Worker = new Worker();

  public jobQueue: Queue

  constructor() {
    // console.log('Setting up Kue...');

    this.jobQueue = kue.createQueue(redisConfig)

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

  public static launchBrowser(expressApp: express.Application) {
    expressApp.use('/kue', kue.app)
  }

  public registerTask<T extends Task>(taskType: ITaskType<T>) {
    TaskRouter.registerTask(taskType)

    this.jobQueue.process(taskType.name, taskType.maxConcurrent, (job: kue.Job, done: kue.DoneCallback) => {
      const start = new Date().getTime()

      let task: Task

      TaskRouter.deserializeTask(job)
        .then(t => {
          task = t
          return task.workerRun()
        })
        .then(result => {
          if (result.error) {
            console.log('Job ' + task.constructor.name + ' (' + job.id + ') error: ' + JSON.stringify(result.error))
            job.remove()
            done(result.error)
          } else {
            console.log(
              'Processed job ' +
                task.constructor.name +
                ' (' +
                job.id +
                ') in ' +
                (new Date().getTime() - start) +
                ' ms.'
            )
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
