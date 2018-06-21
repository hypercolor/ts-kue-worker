import * as kue from 'kue';
import { ITaskType, TaskRunner } from './task-runner';
export declare class TaskRouter {
    private static taskTypes;
    static registerTask(taskType: ITaskType<any>): void;
    static deserializeTask(job: kue.Job): Promise<TaskRunner>;
}
