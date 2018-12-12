import * as express from 'express';
import { IKueWorkerConfig } from './kue-worker';
import { ITaskClass } from './task';
export declare class KueWorkerSubmitter {
    private config;
    constructor(config: IKueWorkerConfig);
    getBrowserApp(): express.Application;
    registerTasksForSubmitting(taskTypes: Array<ITaskClass>): this;
    registerTaskForSubmitting(taskType: ITaskClass): this;
}
