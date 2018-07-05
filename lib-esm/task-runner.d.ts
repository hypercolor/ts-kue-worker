import { Job } from 'kue';
export interface ITaskResult {
    success: boolean;
    error?: any;
    result?: any;
}
export interface ITaskType {
    maxConcurrent: number;
    deserialize(serializedParams: any): Promise<TaskRunner>;
}
export declare abstract class TaskRunner {
    protected job?: Job;
    abstract run(): Promise<ITaskResult>;
}
