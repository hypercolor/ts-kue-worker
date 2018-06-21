export declare abstract class TaskLauncher {
    protected abstract readonly params: any;
    serialize(): any;
    submit(): Promise<{}>;
}
