import axios from 'axios';
import { API_URL } from './index';

export const deleteQueueDeadLetteredMessage = async (
    ns: string,
    queueName: string,
    messageId: string,
    sequenceId: number
) => {
    return axios.delete(
        `${API_URL}/api/ns/${ns}/queues/${queueName}/dead-lettered-messages/${messageId}?sequenceId=${sequenceId}`
    );
};

export const deleteQueuePendingMessage = async (
    ns: string,
    queueName: string,
    messageId: string,
    sequenceId: number
) => {
    return axios.delete(
        `${API_URL}/api/ns/${ns}/queues/${queueName}/pending-messages/${messageId}?sequenceId=${sequenceId}`
    );
};

export const deleteQueuePendingMessageWithPriority = async (ns: string, queueName: string, messageId: string) => {
    return axios.delete(`${API_URL}/api/ns/${ns}/queues/${queueName}/pending-messages-with-priority/${messageId}`);
};

export const deleteQueueAcknowledgedMessage = async (
    ns: string,
    queueName: string,
    messageId: string,
    sequenceId: number
) => {
    return axios.delete(
        `${API_URL}/api/ns/${ns}/queues/${queueName}/acknowledged-messages/${messageId}?sequenceId=${sequenceId}`
    );
};

export const deleteScheduledMessage = async (messageId: string) => {
    return axios.delete(`${API_URL}/api/scheduled-messages/${messageId}`);
};
