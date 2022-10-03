import { ParameterizedRoute } from '../common';
import Queue from '../../components/Queue/Queue';

export interface IQueueRouteParams {
    queueName: string;
    namespace: string;
}

export const queue = ParameterizedRoute<IQueueRouteParams>({
    path: '/namespaces/:namespace/queues/:queueName',
    exact: true,
    component: Queue,
    caption: 'Queue'
});
