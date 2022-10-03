import { ParameterizedRoute } from '../common';
import Queue from '../../components/Queue/Queue';

export interface IQueueRouteParams {
    queueName: string;
    namespace: string;
}

export const queue = ParameterizedRoute<IQueueRouteParams>({
    path: '/queues/:queueName/namespace/:namespace',
    exact: true,
    component: Queue,
    caption: 'Queue'
});
