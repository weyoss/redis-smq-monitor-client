import { ParameterizedRoute } from '../common';
import { IQueueRouteParams } from './queue';
import Producer from '../../components/Producer/Producer';

export interface IProducerRouteParams extends IQueueRouteParams {
    producerId: string;
}

export const producer = ParameterizedRoute<IProducerRouteParams>({
    path: '/namespaces/:namespace/queues/:queueName/producers/:producerId',
    exact: true,
    component: Producer,
    caption: 'Producer'
});
