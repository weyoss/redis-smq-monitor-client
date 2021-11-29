import { ParameterizedRoute } from '../common';
import QueueAcknowledgedMessages from '../../components/QueueAcknowledgedMessages';
import { IQueueRouteParams } from './queue';

export const queueAcknowledgedMessages = ParameterizedRoute<IQueueRouteParams>({
    path: '/namespaces/:namespace/queues/:queueName/acknowledged-messages',
    exact: true,
    component: QueueAcknowledgedMessages,
    caption: 'Acknowledged messages'
});
