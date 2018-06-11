// Generated by dts-bundle v0.7.3
// Dependencies for this module:
//   ../express
//   ../kue

import * as express from 'express';
import { Queue } from 'kue';
import { Job } from 'kue';

export class Worker {
    jobQueue: Queue;
    constructor();
    static launchBrowser(expressApp: express.Application): void;
    registerTask(taskType: ITaskType<any>): void;
}

export interface ITaskResult {
    success: boolean;
    error?: any;
    result: any;
}
export interface ITaskType<T extends Task> {
    name: string;
    new (params: any): T;
}
export abstract class Task {
    valid: boolean;
    protected job?: Job;
    abstract readonly maxConcurrent: number;
    abstract workerRun(): Promise<ITaskResult>;
    protected abstract readonly params: any;
    submit(): Promise<{}>;
    serialize(): any;
}

