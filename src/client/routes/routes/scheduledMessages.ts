import { ParameterizedRoute } from '../common';
import ScheduledMessages from '../../components/ScheduledMessages';

export const scheduledMessages = ParameterizedRoute({
    path: '/scheduled-messages',
    exact: true,
    component: ScheduledMessages,
    caption: 'Scheduled messages'
});
