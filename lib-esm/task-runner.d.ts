import { Job } from 'kue';
export interface ITaskRunnerClass {
    name: string;
    maxConcurrent: number;
    deserialize(serializedParams: any): Promise<TaskRunner>;
}
export declare abstract class TaskRunner {
    static maxConcurrent: number;
    protected job?: Job;
    abstract run(): Promise<any>;
}
