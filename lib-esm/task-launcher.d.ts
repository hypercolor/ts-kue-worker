export declare abstract class TaskLauncher {
    protected abstract readonly serializedParams: any;
    serialize(): any;
    submit(): Promise<{}>;
}
