import axios from 'axios';
import { API_URL } from '../../endpoints';

export const saveQueue = async (queue: { name: string; ns?: string }, type: number) => {
    return axios.post(`${API_URL}/api/queues`, { ...queue, type });
};