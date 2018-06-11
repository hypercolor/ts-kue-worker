import * as express from 'express';
import { Queue } from 'kue';
import { ITaskType } from './task';
export declare class KueWorker {
    jobQueue: Queue;
    constructor();
    static launchBrowser(expressApp: express.Application): void;
    registerTask(taskType: ITaskType<any>): void;
}
