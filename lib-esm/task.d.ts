import { Job } from 'kue';
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
export declare abstract class Task {
    valid: boolean;
    protected job?: Job;
    abstract workerRun(): Promise<ITaskResult>;
    protected abstract readonly serializedParams: any;
    submit(): Promise<{}>;
    serialize(): any;
}
