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
        `${API_URL}/api/queues/${queueName}/ns/${ns}/time-series/acknowledged?from=${from}&to=${to}`
    );
};

export const getQueueDeadLetteredTimeSeries = async (ns: string, queueName: string, from: number, to: number) => {
    return axios.get<TGetTimeSeriesHTTPResponse>(
        `${API_URL}/api/queues/${queueName}/ns/${ns}/time-series/dead-lettered?from=${from}&to=${to}`
    );
};

export const getQueuePublishedTimeSeries = async (ns: string, queueName: string, from: number, to: number) => {
    return axios.get<TGetTimeSeriesHTTPResponse>(
        `${API_URL}/api/queues/${queueName}/ns/${ns}/time-series/published?from=${from}&to=${to}`
    );
};

export const getGlobalAcknowledgedTimeSeries = async (from: number, to: number) => {
    return axios.get<TGetTimeSeriesHTTPResponse>(`${API_URL}/api/main/time-series/acknowledged?from=${from}&to=${to}`);
};

export const getGlobalDeadLetteredTimeSeries = async (from: number, to: number) => {
    return axios.get<TGetTimeSeriesHTTPResponse>(`${API_URL}/api/main/time-series/dead-lettered?from=${from}&to=${to}`);
};

export const getGlobalPublishedTimeSeries = async (from: number, to: number) => {
    return axios.get<TGetTimeSeriesHTTPResponse>(`${API_URL}/api/main/time-series/published?from=${from}&to=${to}`);
};

export const getConsumerAcknowledgedTimeSeries = async (
    ns: string,
    queueName: string,
    consumerId: string,
    from: number,
    to: number
) => {
    return axios.get<TGetTimeSeriesHTTPResponse>(
        `${API_URL}/api/queues/${queueName}/ns/${ns}/consumers/${consumerId}/time-series/acknowledged?from=${from}&to=${to}`
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
        `${API_URL}/api/queues/${queueName}/ns/${ns}/consumers/${consumerId}/time-series/dead-lettered?from=${from}&to=${to}`
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
        `${API_URL}/api/queues/${queueName}/ns/${ns}/producers/${producerId}/time-series/published?from=${from}&to=${to}`
    );
};

export const getMultiQueueProducerPublishedTimeSeries = async (producerId: string, from: number, to: number) => {
    return axios.get<TGetTimeSeriesHTTPResponse>(
        `${API_URL}/api/main/multi-queue-producers/${producerId}/time-series/published?from=${from}&to=${to}`
    );
};
