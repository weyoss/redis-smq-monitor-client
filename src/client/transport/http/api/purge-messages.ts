import axios from 'axios';
import { API_URL } from '../../endpoints';

export const purgeAcknowledgedMessages = async (ns: string, queueName: string) => {
    return axios.delete(`${API_URL}/api/ns/${ns}/queues/${queueName}/pending-messages`);
};

export const purgeDeadLetteredMessages = async (ns: string, queueName: string) => {
    return axios.delete(`${API_URL}/api/ns/${ns}/queues/${queueName}/dead-lettered-messages`);
};

export const purgePendingMessages = async (ns: string, queueName: string) => {
    return axios.delete(`${API_URL}/api/ns/${ns}/queues/${queueName}/pending-messages`);
};

export const purgeScheduledMessages = async () => {
    return axios.delete(`${API_URL}/api/main/scheduled-messages`);
};
