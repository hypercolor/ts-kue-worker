var TaskRouter = /** @class */ (function () {
    function TaskRouter() {
    }
    TaskRouter.registerTask = function (taskType) {
        this.taskTypes.push(taskType);
    };
    TaskRouter.deserializeTask = function (job) {
        var task = null;
        if (job.type) {
            for (var _i = 0, _a = this.taskTypes; _i < _a.length; _i++) {
                var taskType = _a[_i];
                if (job.type === taskType.name) {
                    task = new taskType(job.data);
                    break;
                }
            }
        }
        return task;
    };
    TaskRouter.taskTypes = [];
    return TaskRouter;
}());
export { TaskRouter };
//# sourceMappingURL=task-router.js.map