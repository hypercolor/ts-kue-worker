import * as kue from 'kue';
import { ITaskType, Task } from './task';
export declare class TaskRouter {
    private static taskTypes;
    static registerTask(taskType: ITaskType<any>): void;
    static deserializeTask(job: kue.Job): Task | null;
}
