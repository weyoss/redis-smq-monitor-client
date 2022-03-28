import { ParameterizedRoute } from '../common';
import QueuePendingMessages from '../../components/PendingMessages/PendingMessages';
import { IQueueRouteParams } from './queue';

export const pendingMessages = ParameterizedRoute<IQueueRouteParams>({
    path: '/namespaces/:namespace/queues/:queueName/pending-messages',
    exact: true,
    component: QueuePendingMessages,
    caption: 'Pending messages'
});
