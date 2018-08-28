import * as kue from 'kue';
export class KueWorkerSubmitter {
    constructor(config) {
        this.config = config;
    }
    static getBrowserApp() {
        return kue.app;
    }
    registerTasks(taskTypes) {
        taskTypes.forEach(taskType => {
            this.registerTask(taskType);
        });
    }
    registerTask(taskType) {
        taskType.workerConfig = this.config;
    }
}
//# sourceMappingURL=kue-worker-submitter.js.map