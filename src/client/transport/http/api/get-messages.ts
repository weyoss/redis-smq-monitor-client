import axios from 'axios';
import { API_URL, IHTTPResponse } from './index';
import { IMessage } from './common/IMessage';

export type TPaginatedHTTPResponse<T> = IHTTPResponse<{
    total: number;
    items: T[];
}>;

export type TGetQueueMessagesHTTPResponse = TPaginatedHTTPResponse<{
    sequenceId: number;
    message: IMessage;
}>;

export type TGetScheduledMessagesHTTPResponse = TPaginatedHTTPResponse<IMessage>;

export type TGetPendingMessagesWithPriorityHTTPResponse = TPaginatedHTTPResponse<IMessage>;

export const getScheduledMessages = async (skip: number, take: number) => {
    return axios.get<TGetScheduledMessagesHTTPResponse>(
        `${API_URL}/api/main/scheduled-messages?skip=${skip}&take=${take}`
    );
};

export const getQueuePendingMessagesWithPriority = async (
    ns: string,
    queueName: string,
    skip: number,
    take: number
) => {
    return axios.get<TGetPendingMessagesWithPriorityHTTPResponse>(
        `${API_URL}/api/queues/${queueName}/ns/${ns}/pending-messages-with-priority?skip=${skip}&take=${take}`
    );
};

export const getQueuePendingMessages = async (ns: string, queueName: string, skip: number, take: number) => {
    return axios.get<TGetQueueMessagesHTTPResponse>(
        `${API_URL}/api/queues/${queueName}/ns/${ns}/pending-messages?skip=${skip}&take=${take}`
    );
};

export const getQueueAcknowledgedMessages = async (ns: string, queueName: string, skip: number, take: number) => {
    return await axios.get<TGetQueueMessagesHTTPResponse>(
        `${API_URL}/api/queues/${queueName}/ns/${ns}/acknowledged-messages?skip=${skip}&take=${take}`
    );
};

export const getQueueDeadLetteredMessages = async (ns: string, queueName: string, skip: number, take: number) => {
    return axios.get<TGetQueueMessagesHTTPResponse>(
        `${API_URL}/api/queues/${queueName}/ns/${ns}/dead-lettered-messages?skip=${skip}&take=${take}`
    );
};
