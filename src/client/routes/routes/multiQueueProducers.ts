import { ParameterizedRoute } from '../common';
import MultiQueueProducers from '../../components/MultiQueueProducers/MultiQueueProducers';

export const multiQueueProducers = ParameterizedRoute<Record<string, never>>({
    path: '/multi-queue-producers',
    exact: true,
    component: MultiQueueProducers,
    caption: 'Multi-Queue Producers'
});
