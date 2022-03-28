import { ParameterizedRoute } from '../common';
import QueuePendingMessagesWithPriority from '../../components/PendingMessagesWithPriority/PendingMessagesWithPriority';
import { IQueueRouteParams } from './queue';

export const pendingMessagesWithPriority = ParameterizedRoute<IQueueRouteParams>({
    path: '/namespaces/:namespace/queues/:queueName/pending-messages-with-priority',
    exact: true,
    component: QueuePendingMessagesWithPriority,
    caption: 'Pending messages with priority'
});
