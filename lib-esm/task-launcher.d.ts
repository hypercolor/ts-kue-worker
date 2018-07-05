import { IKueWorkerConfig } from './kue-worker';
import { ITaskType } from './task-runner';
export declare abstract class TaskLauncher {
    protected abstract readonly params: any;
    abstract readonly runner: ITaskType;
    submit(workerConfig: IKueWorkerConfig): Promise<{}>;
}
