import { Queues } from '../../models/Queues';

export interface activeQueueMatchParamsInterface {
    qn: string;
    ns: string;
}

export interface QueueListPagePropsInterface {
    queues: Queues;
    activeQueue: activeQueueMatchParamsInterface | null;
    loading: boolean;
}
