import * as express from 'express';
import { Queue } from 'kue';
import { ITaskType, TaskRunner } from './task-runner';
export interface IKueConfig {
    redis: string;
}
export declare class KueWorkerConfig {
    static redisParams: IKueConfig;
}
export declare class KueWorker {
    jobQueue: Queue;
    constructor(redisConfig: IKueConfig);
    static mountBrowserApp(expressApp: express.Application): void;
    registerTask<T extends TaskRunner>(taskType: ITaskType<T>): void;
}
