import { Queues } from '../../models/Queues';

export interface activeQueueMatchParamsInterface {
    qn: string;
    ns: string;
}

export interface QueueLabelsPagePropsInterface {
    queues: Queues;
    activeQueue: activeQueueMatchParamsInterface | null;
}
