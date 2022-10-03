import axios from 'axios';
import { API_URL } from '../../endpoints';

export const getExchanges = async () => {
    return axios.get(
        `${API_URL}/api/exchanges`
    );
};

export const getExchangeQueues = async (exchangeName: string) => {
    return axios.get(
        `${API_URL}/api/exchanges/${exchangeName}/queues`
    );
};

export const createExchange = async (exchangeName: string) => {
    return axios.post(
        `${API_URL}/api/exchanges`,
        { exchangeName }
    );
};