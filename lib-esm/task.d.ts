import { Job } from 'kue';
export interface ITaskResult {
    success: boolean;
    error?: any;
    result?: any;
}
export interface ITaskType<T extends Task> {
    name: string;
    maxConcurrent: number;
    build(params: any): Promise<T>;
}
export declare abstract class Task {
    valid: boolean;
    protected job?: Job;
    abstract readonly maxConcurrent: number;
    abstract workerRun(): Promise<ITaskResult>;
    abstract serialize(): any;
    submit(): Promise<{}>;
}
