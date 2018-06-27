import * as express from 'express';
import { Queue } from 'kue';
import { ITaskType, TaskRunner } from './task-runner';
export interface IKueWorkerConfig {
    connection: {
        redis: string;
    };
}
export declare class KueWorkerConfig {
    static config: IKueWorkerConfig;
}
export declare class KueWorker {
    jobQueue: Queue;
    constructor(config: IKueWorkerConfig);
    static mountBrowserApp(expressApp: express.Application): void;
    registerTask<T extends TaskRunner>(taskType: ITaskType<T>): void;
}
