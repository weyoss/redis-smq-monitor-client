import { ParameterizedRoute } from '../common';
import QueuePendingMessagesWithPriority from '../../components/QueuePendingMessagesWithPriority';
import { IQueueRouteParams } from './queue';

export const queuePendingMessagesWithPriority = ParameterizedRoute<IQueueRouteParams>({
    path: '/namespaces/:namespace/queues/:queueName/pending-messages-with-priority',
    exact: true,
    component: QueuePendingMessagesWithPriority,
    caption: 'Pending messages with priority'
});
