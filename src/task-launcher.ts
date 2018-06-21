import * as kue from 'kue'

// TODO: CONVERT THIS TO CONFIG
const redisConfig = {
  redis: process.env.REDIS_URL,
}

export abstract class TaskLauncher {
  protected abstract get serializedParams(): any

  public serialize() {
    const json = this.serializedParams
    json.type = this.constructor.name
    return json
  }

  public submit() {
    const jobQueue = kue.createQueue(redisConfig)

    return new Promise((resolve, reject) => {
      // this.sharedInstance.jobQueue = kue.createQueue();
      const job = jobQueue
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
            // console.log('Task submitted.');
            resolve(job)
          }
        })
    })
  }
}
