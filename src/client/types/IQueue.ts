import { IConsumerMap } from './IConsumerMap';
import { IProducerMap } from './IProducerMap';

export interface IQueue {
    namespace: string;
    queueName: string;
    acknowledgedMessages: number;
    deadLetteredMessages: number;
    pendingMessages: number;
    pendingMessagesWithPriority: number;
    consumers: IConsumerMap;
    producers: IProducerMap;
}
