import axios from 'axios';
import { API_URL } from '../../endpoints';

export const requeueDeadLetteredMessage = async (
    ns: string,
    queueName: string,
    messageId: string,
    sequenceId: number
) => {
    return axios.post(
        `${API_URL}/api/ns/${ns}/queues/${queueName}/dead-lettered-messages/${messageId}/requeue?sequenceId=${sequenceId}`
    );
};

export const requeueAcknowledgedMessage = async (
    ns: string,
    queueName: string,
    messageId: string,
    sequenceId: number
) => {
    return axios.post(
        `${API_URL}/api/ns/${ns}/queues/${queueName}/acknowledged-messages/${messageId}/requeue?sequenceId=${sequenceId}`
    );
};
