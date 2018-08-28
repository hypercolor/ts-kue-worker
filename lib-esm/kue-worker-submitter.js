import * as kue from 'kue';
export class KueWorkerSubmitter {
    constructor(config) {
        this.config = config;
    }
    getBrowserApp() {
        // create a queue to force kue to set its global app variable to use our connection params :/
        kue.createQueue(this.config.connection);
        return kue.app;
    }
    registerTasks(taskTypes) {
        taskTypes.forEach(taskType => {
            this.registerTask(taskType);
        });
        return this;
    }
    registerTask(taskType) {
        taskType.workerConfig = this.config;
        return this;
    }
}
//# sourceMappingURL=kue-worker-submitter.js.map