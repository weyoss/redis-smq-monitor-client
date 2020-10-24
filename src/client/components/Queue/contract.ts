import { Queue } from '../../models/Queue';
import { Rates } from '../../models/Rates';
import { QueueRouteParamsInterface } from '../../routes/contract';
import { RouteComponentProps } from 'react-router';

export interface QueuePropsInterface extends RouteComponentProps<QueueRouteParamsInterface> {}

export interface QueuePagePropsInterface {
    queue: Queue | undefined;
    rates: Rates;
}
