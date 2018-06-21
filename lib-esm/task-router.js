export class TaskRouter {
    static registerTask(taskType) {
        this.taskTypes.push(taskType);
    }
    static deserializeTask(job) {
        if (job.type) {
            for (const taskType of this.taskTypes) {
                if (job.type === taskType.name) {
                    return taskType.deserialize(job.data);
                }
            }
        }
        return Promise.reject(new Error('Couldnt match task type: ' + job.type));
    }
}
TaskRouter.taskTypes = [];
//# sourceMappingURL=task-router.js.map