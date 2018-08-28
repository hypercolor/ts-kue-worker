import * as kue from 'kue';
import { ITaskRunnerClass, Task } from './task';
export declare class TaskRouter {
    private static taskTypes;
    static registerTask(taskType: ITaskRunnerClass): void;
    static deserializeTask(job: kue.Job): Promise<Task>;
}
