import { Rates } from './Rates';
import { Queues } from './Queues';

export interface Stats {
    rates: Rates;
    queues: Queues;
}
