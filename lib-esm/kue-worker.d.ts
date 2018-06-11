import * as express from 'express';
import { Queue } from 'kue';
import { ITaskType, Task } from "./task";
export declare class KueWorker {
    jobQueue: Queue;
    constructor();
    static launchBrowser(expressApp: express.Application): void;
    registerTask<T extends Task>(taskType: ITaskType<T>): void;
}
