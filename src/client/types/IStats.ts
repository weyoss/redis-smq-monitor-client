import { IRates } from './IRates';
import { IQueueMap } from './IQueueMap';

export interface IStats {
    rates: IRates;
    queues: IQueueMap;
}
