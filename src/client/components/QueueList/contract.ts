import { Queues } from '../../models/Queues';
import { QueueRouteParamsInterface } from '../../routes/contract';

export interface QueueListPagePropsInterface {
    queues: Queues;
    matchedQueueParams: QueueRouteParamsInterface | null;
    loading: boolean;
}
