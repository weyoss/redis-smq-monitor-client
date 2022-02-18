import axios from 'axios';
import { API_URL, IHTTPResponse } from './index';

export type TGetQueueRateLimitResponse = IHTTPResponse<{
  interval: number;
  limit: number;
} | null>;

export const setQueueRateLimit = async (ns: string, queueName: string, interval: number, limit: number) => {
    return axios.post(`${API_URL}/api/ns/${ns}/queues/${queueName}/rate-limit`, { interval, limit });
};

export const clearQueueRateLimit = async (ns: string, queueName: string) => {
    return axios.delete(`${API_URL}/api/ns/${ns}/queues/${queueName}/rate-limit`);
};

export const getQueueRateLimit = async (ns: string, queueName: string) => {
    return axios.get<TGetQueueRateLimitResponse>(`${API_URL}/api/ns/${ns}/queues/${queueName}/rate-limit`);
};