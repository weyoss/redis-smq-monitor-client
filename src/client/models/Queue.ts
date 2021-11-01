import { Consumers } from './Consumers';
import { Producers } from './producers';

export interface Queue {
    namespace: string;
    queueName: string;
    acknowledgedMessages: number;
    deadLetteredMessages: number;
    pendingMessages: number;
    pendingMessagesWithPriority: number;
    consumers: Consumers;
    producers: Producers;
}
