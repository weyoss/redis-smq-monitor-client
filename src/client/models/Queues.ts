import { Queue } from './Queue';

export interface Queues {
    [ns: string]: {
        [queueName: string]: Queue;
    };
}
