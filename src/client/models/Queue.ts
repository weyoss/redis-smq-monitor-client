import { Consumers } from './Consumers';
import { Producers } from './producers';

export interface Queue {
    namespace: string;
    name: string;
    size: number;
    erroredMessages: number;
    consumers: Consumers;
    producers: Producers;
}
