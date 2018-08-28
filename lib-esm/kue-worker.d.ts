import * as express from 'express';
import { Queue } from 'kue';
import { ITaskRunnerClass } from './task';
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
    registerTask(taskType: ITaskRunnerClass): void;
}
