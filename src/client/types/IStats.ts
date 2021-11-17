import { IRates } from './IRates';
import { IQueueMap } from './IQueueMap';

export interface IStats {
    scheduledMessages: number;
    rates: IRates;
    queues: IQueueMap;
}
