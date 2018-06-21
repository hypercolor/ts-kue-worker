import * as express from 'express';
import { Queue } from 'kue';
import { ITaskType, TaskRunner } from './task-runner';
export interface IRedisConfig {
    redis: string;
}
export declare class KueWorkerConfig {
    static redisParams: IRedisConfig;
}
export declare class KueWorker {
    jobQueue: Queue;
    constructor();
    static setRedisUrl(redisUrl: string): void;
    static mountBrowserApp(expressApp: express.Application): void;
    registerTask<T extends TaskRunner>(taskType: ITaskType<T>): void;
}
