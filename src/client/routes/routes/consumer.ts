import { ParameterizedRoute } from '../common';
import Consumer from '../../components/Consumer/Consumer';
import { IQueueRouteParams } from './queue';

export interface IConsumerRouteParams extends IQueueRouteParams {
    consumerId: string;
}

export const consumer = ParameterizedRoute<IConsumerRouteParams>({
    path: '/namespaces/:namespace/queues/:queueName/consumers/:consumerId',
    exact: true,
    component: Consumer,
    caption: 'Consumer'
});
