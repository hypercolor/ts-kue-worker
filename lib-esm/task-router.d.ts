import * as kue from 'kue';
import { ITaskRunnerClass, TaskRunner } from './task-runner';
export declare class TaskRouter {
    private static taskTypes;
    static registerTask(taskType: ITaskRunnerClass): void;
    static deserializeTask(job: kue.Job): Promise<TaskRunner>;
}
