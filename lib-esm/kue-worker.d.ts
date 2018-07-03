import * as express from 'express';
import { Queue } from 'kue';
import { ITaskType } from './task-runner';
export interface IKueWorkerConfig {
    connection: {
        redis: string;
    };
}
export declare class KueWorker {
    config: IKueWorkerConfig;
    jobQueue: Queue;
    constructor(config: IKueWorkerConfig);
    mountBrowserApp(expressApp: express.Application): void;
    registerTask(taskType: ITaskType): void;
}
