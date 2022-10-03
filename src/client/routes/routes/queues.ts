import { ParameterizedRoute } from '../common';
import Queues from '../../components/Queues/Queues';

export const queues = ParameterizedRoute({
    path: '/queues',
    component: Queues,
    caption: 'Queues'
});
