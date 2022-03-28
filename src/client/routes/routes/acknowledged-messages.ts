import { ParameterizedRoute } from '../common';
import QueueAcknowledgedMessages from '../../components/AcknowledgedMessages/AcknowledgedMessages';
import { IQueueRouteParams } from './queue';

export const acknowledgedMessages = ParameterizedRoute<IQueueRouteParams>({
    path: '/namespaces/:namespace/queues/:queueName/acknowledged-messages',
    exact: true,
    component: QueueAcknowledgedMessages,
    caption: 'Acknowledged messages'
});
