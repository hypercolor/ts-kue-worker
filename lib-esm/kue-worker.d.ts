import { Queue } from 'kue';
import { ITaskClass } from './task';
export interface IKueWorkerConfig {
    connection: {
        redis: string;
    };
}
export declare class KueWorker {
    config: IKueWorkerConfig;
    jobQueue: Queue;
    constructor(config: IKueWorkerConfig);
    registerTasks(taskTypes: Array<ITaskClass>): void;
    registerTask(taskType: ITaskClass): void;
}
