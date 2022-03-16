import axios from 'axios';
import { API_URL } from '../../endpoints';

export const deleteQueue = async (ns: string, queueName: string) => {
    return axios.delete(`${API_URL}/api/ns/${ns}/queues/${queueName}`);
};
