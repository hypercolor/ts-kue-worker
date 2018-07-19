import { Job } from 'kue';
export interface ITaskResult {
    success: boolean;
    error?: any;
    result?: any;
    message?: string;
}
export interface ITaskRunnerClass {
    name: string;
    maxConcurrent: number;
    deserialize(serializedParams: any): Promise<TaskRunner>;
}
export declare abstract class TaskRunner {
    static maxConcurrent: number;
    protected job?: Job;
    abstract run(): Promise<ITaskResult>;
}
