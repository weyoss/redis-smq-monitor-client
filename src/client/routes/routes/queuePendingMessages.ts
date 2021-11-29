import { ParameterizedRoute } from '../common';
import QueuePendingMessages from '../../components/QueuePendingMessages';
import { IQueueRouteParams } from './queue';

export const queuePendingMessages = ParameterizedRoute<IQueueRouteParams>({
    path: '/namespaces/:namespace/queues/:queueName/pending-messages',
    exact: true,
    component: QueuePendingMessages,
    caption: 'Pending messages'
});
