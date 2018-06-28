import { IKueWorkerConfig } from './kue-worker';
export declare abstract class TaskLauncher {
    protected abstract readonly params: any;
    serialize(): any;
    submit(workerConfig: IKueWorkerConfig): Promise<{}>;
}
