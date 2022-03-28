import { ParameterizedRoute } from '../common';
import { IQueueRouteParams } from './queue';
import Consumers from '../../components/Consumers/Consumers';

export const consumers = ParameterizedRoute<IQueueRouteParams>({
    path: '/namespaces/:namespace/queues/:queueName/consumers',
    exact: true,
    component: Consumers,
    caption: 'Consumers'
});
