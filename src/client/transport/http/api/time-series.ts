import axios from 'axios';
import { API_URL, IHTTPResponse } from './index';

export type TGetTimeSeriesHTTPResponse = IHTTPResponse<
    {
        timestamp: number;
        value: number;
    }[]
>;

export const getQueueAcknowledgedTimeSeries = async (ns: string, queueName: string, from: number, to: number) => {
    return axios.get<TGetTimeSeriesHTTPResponse>(
        `${API_URL}/api/ns/${ns}/queues/${queueName}/acknowledged-time-series?from=${from}&to=${to}`
    );
};

export const getQueueDeadLetteredTimeSeries = async (ns: string, queueName: string, from: number, to: number) => {
    return axios.get<TGetTimeSeriesHTTPResponse>(
        `${API_URL}/api/ns/${ns}/queues/${queueName}/dead-lettered-time-series?from=${from}&to=${to}`
    );
};

export const getQueuePublishedTimeSeries = async (ns: string, queueName: string, from: number, to: number) => {
    return axios.get<TGetTimeSeriesHTTPResponse>(
        `${API_URL}/api/ns/${ns}/queues/${queueName}/published-time-series?from=${from}&to=${to}`
    );
};

export const getGlobalAcknowledgedTimeSeries = async (from: number, to: number) => {
    return axios.get<TGetTimeSeriesHTTPResponse>(`${API_URL}/api/time-series/acknowledged?from=${from}&to=${to}`);
};

export const getGlobalDeadLetteredTimeSeries = async (from: number, to: number) => {
    return axios.get<TGetTimeSeriesHTTPResponse>(`${API_URL}/api/time-series/dead-lettered?from=${from}&to=${to}`);
};

export const getGlobalPublishedTimeSeries = async (from: number, to: number) => {
    return axios.get<TGetTimeSeriesHTTPResponse>(`${API_URL}/api/time-series/published?from=${from}&to=${to}`);
};

export const getConsumerAcknowledgedTimeSeries = async (
    ns: string,
    queueName: string,
    consumerId: string,
    from: number,
    to: number
) => {
    return axios.get<TGetTimeSeriesHTTPResponse>(
        `${API_URL}/api/ns/${ns}/queues/${queueName}/consumers/${consumerId}/acknowledged-time-series?from=${from}&to=${to}`
    );
};

export const getConsumerDeadLetteredTimeSeries = async (
    ns: string,
    queueName: string,
    consumerId: string,
    from: number,
    to: number
) => {
    return axios.get<TGetTimeSeriesHTTPResponse>(
        `${API_URL}/api/ns/${ns}/queues/${queueName}/consumers/${consumerId}/dead-lettered-time-series?from=${from}&to=${to}`
    );
};

export const getProducerPublishedTimeSeries = async (
    ns: string,
    queueName: string,
    producerId: string,
    from: number,
    to: number
) => {
    return axios.get<TGetTimeSeriesHTTPResponse>(
        `${API_URL}/api/ns/${ns}/queues/${queueName}/producers/${producerId}/published-time-series?from=${from}&to=${to}`
    );
};

export const getMultiQueueProducerPublishedTimeSeries = async (producerId: string, from: number, to: number) => {
    return axios.get<TGetTimeSeriesHTTPResponse>(
        `${API_URL}/api/multi-queue-producers/${producerId}/published-time-series?from=${from}&to=${to}`
    );
};
