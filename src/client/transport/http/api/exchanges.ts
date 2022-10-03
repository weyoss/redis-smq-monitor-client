import axios from 'axios';
import { API_URL } from '../../endpoints';
import { IMessageQueue } from './common/IMessage';

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

export const bindQueue = async (queue: IMessageQueue, exchangeName: string) => {
    return axios.post(
        `${API_URL}/api/exchanges/${exchangeName}/bind`,
        { queue }
    );
}

export const unbindQueue = async (queue: IMessageQueue, exchangeName: string) => {
    return axios.post(
        `${API_URL}/api/exchanges/${exchangeName}/unbind`,
        { queue }
    );
}

export const deleteExchange = async (exchangeName: string) => {
    return axios.delete(
        `${API_URL}/api/exchanges/${exchangeName}`
    );
};