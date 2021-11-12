import { IQueue } from './IQueue';

export interface IQueueMap {
    [ns: string]: {
        [queueName: string]: IQueue;
    };
}
