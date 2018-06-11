export class TaskRouter {
    static registerTask(taskType) {
        this.taskTypes.push(taskType);
    }
    static deserializeTask(job) {
        let task = null;
        if (job.type) {
            for (const taskType of this.taskTypes) {
                if (job.type === taskType.name) {
                    task = new taskType(job.data);
                    break;
                }
            }
        }
        return task;
    }
}
TaskRouter.taskTypes = [];
//# sourceMappingURL=task-router.js.map