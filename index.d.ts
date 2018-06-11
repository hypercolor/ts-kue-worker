// Generated by dts-bundle v0.7.3
// Dependencies for this module:
//   ../express
//   ../kue

import * as express from 'express';
import { Queue } from 'kue';
import { Job } from 'kue';

export class KueWorker {
    jobQueue: Queue;
    constructor();
    static launchBrowser(expressApp: express.Application): void;
    registerTask<T extends Task>(taskType: ITaskType<T>): void;
}

export interface ITaskResult {
    success: boolean;
    error?: any;
    result?: any;
}
export interface ITaskType<T extends Task> {
    name: string;
    maxConcurrent: number;
    build(serializedParams: any): Promise<T>;
}
export abstract class Task {
    valid: boolean;
    protected job?: Job;
    abstract workerRun(): Promise<ITaskResult>;
    protected abstract readonly serializedParams: any;
    submit(): Promise<{}>;
    serialize(): any;
}

