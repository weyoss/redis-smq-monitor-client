import { Queue } from '../../models/Queue';
import { RouteComponentProps } from 'react-router';
import { Rates } from '../../models/Rates';

export interface QueuePropsInterface
    extends RouteComponentProps<{
        ns: string;
        qn: string;
    }> {}

export interface QueuePagePropsInterface {
    queue: Queue | null;
    rates: Rates;
}
