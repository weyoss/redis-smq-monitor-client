import { IQueue } from '../../types/IQueue';
import { IRates } from '../../types/IRates';
import { IQueueRouteParams } from '../../routes/contract';
import { RouteComponentProps } from 'react-router';

export interface QueuePropsInterface extends RouteComponentProps<IQueueRouteParams> {}

export interface IQueuePageProps {
    queue: IQueue | undefined;
    rates: IRates;
}
