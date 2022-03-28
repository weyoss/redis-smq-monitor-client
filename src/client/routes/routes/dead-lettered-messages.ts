import { ParameterizedRoute } from '../common';
import QueueDeadLetteredMessages from '../../components/DeadLetteredMessages/DeadLetteredMessages';
import { IQueueRouteParams } from './queue';

export const deadLetteredMessages = ParameterizedRoute<IQueueRouteParams>({
    path: '/namespaces/:namespace/queues/:queueName/dead-lettered-messages',
    exact: true,
    component: QueueDeadLetteredMessages,
    caption: 'Dead-lettered messages'
});
