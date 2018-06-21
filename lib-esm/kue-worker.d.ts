import * as express from 'express';
import { Queue } from 'kue';
import { ITaskType, TaskRunner } from './task-runner';
export declare class KueWorker {
    jobQueue: Queue;
    constructor();
    static launchBrowser(expressApp: express.Application): void;
    registerTask<T extends TaskRunner>(taskType: ITaskType<T>): void;
}
