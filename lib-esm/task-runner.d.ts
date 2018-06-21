import { Job } from 'kue';
export interface ITaskResult {
    success: boolean;
    error?: any;
    result?: any;
}
export interface ITaskType<T extends TaskRunner> {
    name: string;
    maxConcurrent: number;
    deserialize(serializedParams: any): Promise<T>;
}
export declare abstract class TaskRunner {
    protected job?: Job;
    abstract run(): Promise<ITaskResult>;
}
