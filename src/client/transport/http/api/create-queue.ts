import axios from 'axios';
import { API_URL } from '../../endpoints';

export const createQueue = async (queue: { name: string; ns?: string }, enablePriorityQueuing: boolean) => {
    return axios.post(`${API_URL}/api/queues`, { ...queue, enablePriorityQueuing });
};
