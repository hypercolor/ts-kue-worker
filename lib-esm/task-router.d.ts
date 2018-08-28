import * as kue from 'kue';
import { ITaskClass, Task } from './task';
export declare class TaskRouter {
    private static taskTypes;
    static registerTask(taskType: ITaskClass): void;
    static deserializeTask(job: kue.Job): Promise<Task>;
}
