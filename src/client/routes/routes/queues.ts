import { ParameterizedRoute } from '../common';
import Queues from '../../components/Queues/Queues';

export interface IQueuesRouteParams {
    namespace: string;
}

export const queues = ParameterizedRoute<IQueuesRouteParams>({
    path: '/namespaces/:namespace/queues',
    component: Queues,
    caption: 'Queues'
});
