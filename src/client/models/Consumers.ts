import { Consumer } from './Consumer';

export interface Consumers {
    [consumerId: string]: Consumer;
}
