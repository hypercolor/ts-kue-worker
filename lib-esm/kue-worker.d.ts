import * as express from 'express';
import { Queue } from 'kue';
import { ITaskType, TaskRunner } from './task-runner';
export interface IKueWorkerConfig {
    connection: {
        redis: string;
    };
}
export declare class KueWorker {
    config: IKueWorkerConfig;
    jobQueue: Queue;
    constructor(config: IKueWorkerConfig);
    static mountBrowserApp(expressApp: express.Application): void;
    registerTask<T extends TaskRunner>(taskType: ITaskType<T>): void;
}
