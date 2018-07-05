import { IKueWorkerConfig } from './kue-worker';
import { ITaskRunnerClass } from './task-runner';
export declare abstract class TaskLauncher {
    protected abstract readonly params: any;
    abstract readonly runner: ITaskRunnerClass;
    submit(workerConfig: IKueWorkerConfig): Promise<{}>;
}
