import * as express from "express";
import { IKueWorkerConfig } from "./kue-worker";
import { ITaskClass } from "./task";
export declare class KueWorkerSubmitter {
    private config;
    constructor(config: IKueWorkerConfig);
    static getBrowserApp(): express.Application;
    registerTasks(taskTypes: Array<ITaskClass>): void;
    registerTask(taskType: ITaskClass): void;
}
