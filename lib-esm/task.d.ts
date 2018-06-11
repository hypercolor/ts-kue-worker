import { Job } from 'kue';
export interface ITaskResult {
    success: boolean;
    error?: any;
    result?: any;
}
export interface ITaskType<T extends Task> {
    new (params: any): T;
}
export declare abstract class Task {
    valid: boolean;
    protected job?: Job;
    abstract readonly maxConcurrent: number;
    abstract workerRun(): Promise<ITaskResult>;
    protected abstract readonly params: any;
    submit(): Promise<{}>;
    serialize(): any;
}
