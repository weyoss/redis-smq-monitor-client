import { ParameterizedRoute } from '../common';
import QueueDeadLetteredMessages from '../../components/QueueDeadLetteredMessages';
import { IQueueRouteParams } from './queue';

export const queueDeadLetteredMessages = ParameterizedRoute<IQueueRouteParams>({
    path: '/namespaces/:namespace/queues/:queueName/dead-lettered-messages',
    exact: true,
    component: QueueDeadLetteredMessages,
    caption: 'Dead-lettered messages'
});
