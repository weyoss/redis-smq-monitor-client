import { ParameterizedRoute } from '../common';
import { IQueueRouteParams } from './queue';
import QueueProducers from '../../components/QueueProducers/QueueProducers';

export const queueProducers = ParameterizedRoute<IQueueRouteParams>({
    path: '/namespaces/:namespace/queues/:queueName/producers',
    exact: true,
    component: QueueProducers,
    caption: 'Producers'
});
