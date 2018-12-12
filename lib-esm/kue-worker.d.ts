import { Queue } from 'kue';
import { ITaskClass, Task } from './task';
export interface IKueWorkerConfig {
    connection: {
        redis: string;
    };
}
export declare type KueWorkerSuccessfulTaskCallback = (task: Task, result: any) => void;
export declare type KueWorkerFailedTaskCallback = (task: Task, error: any) => void;
export declare class KueWorker {
    config: IKueWorkerConfig;
    jobQueue: Queue;
    constructor(config: IKueWorkerConfig);
    registerTasksForProcessing(taskTypes: Array<ITaskClass>, successCallback: KueWorkerSuccessfulTaskCallback, failCallback: KueWorkerFailedTaskCallback): void;
    registerTaskForProcessing(taskType: ITaskClass, successCallback: KueWorkerSuccessfulTaskCallback, failCallback: KueWorkerFailedTaskCallback): void;
}
