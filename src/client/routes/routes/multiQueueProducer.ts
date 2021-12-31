import { ParameterizedRoute } from '../common';
import MultiQueueProducer from '../../components/MultiQueueProducer/MultiQueueProducer';

export interface IMultiQueueProducerRouteParams {
    producerId: string;
}

export const multiQueueProducer = ParameterizedRoute<IMultiQueueProducerRouteParams>({
    path: '/multi-queue-producers/:producerId',
    exact: true,
    component: MultiQueueProducer,
    caption: 'Producer'
});
