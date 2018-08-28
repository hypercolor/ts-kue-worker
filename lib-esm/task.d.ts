import { Job } from 'kue';
import { IKueWorkerConfig } from "./kue-worker";
export interface ITaskRunnerClass {
    name: string;
    maxConcurrent: number;
    workerConfig: IKueWorkerConfig;
    deserialize(serializedParams: any): Promise<Task>;
}
export declare abstract class Task {
    static maxConcurrent: number;
    static workerConfig: IKueWorkerConfig;
    protected abstract readonly params: any;
    protected job?: Job;
    abstract doTaskWork(): Promise<any>;
    submit(): Promise<{}>;
}
