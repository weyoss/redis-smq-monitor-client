import axios from 'axios';
import { IGetQueueMessagesResponse } from './contract';

export const getQueuePendingMessagesWithPriority = async (
    ns: string,
    queueName: string,
    skip: number,
    take: number
) => {
    return axios.get<IGetQueueMessagesResponse>(
        `/api/queues/${queueName}/pending-messages-with-priority?ns=${ns}&skip=${skip}&take=${take}`
    );
};

export const getQueuePendingMessages = async (ns: string, queueName: string, skip: number, take: number) => {
    return axios.get<IGetQueueMessagesResponse>(
        `/api/queues/${queueName}/pending-messages?ns=${ns}&skip=${skip}&take=${take}`
    );
};

export const getQueueAcknowledgedMessages = async (ns: string, queueName: string, skip: number, take: number) => {
    return await axios.get<IGetQueueMessagesResponse>(
        `/api/queues/${queueName}/acknowledged-messages?ns=${ns}&skip=${skip}&take=${take}`
    );
};

export const getQueueDeadLetteredMessages = async (ns: string, queueName: string, skip: number, take: number) => {
    return axios.get<IGetQueueMessagesResponse>(
        `/api/queues/${queueName}/dead-lettered-messages?ns=${ns}&skip=${skip}&take=${take}`
    );
};

export const deleteQueueDeadLetteredMessage = async (
    ns: string,
    queueName: string,
    messageId: string,
    sequenceId: number
) => {
    return axios.delete(
        `/api/queues/${queueName}/dead-lettered-messages/${messageId}?ns=${ns}&sequenceId=${sequenceId}`
    );
};

export const deleteQueuePendingMessage = async (
    ns: string,
    queueName: string,
    messageId: string,
    sequenceId: number
) => {
    return axios.delete(`/api/queues/${queueName}/pending-messages/${messageId}?ns=${ns}&sequenceId=${sequenceId}`);
};

export const deleteQueuePendingMessageWithPriority = async (
    ns: string,
    queueName: string,
    messageId: string,
    sequenceId: number
) => {
    return axios.delete(
        `/api/queues/${queueName}/pending-messages-with-priority/${messageId}?ns=${ns}&sequenceId=${sequenceId}`
    );
};

export const deleteQueueAcknowledgedMessage = async (
    ns: string,
    queueName: string,
    messageId: string,
    sequenceId: number
) => {
    return axios.delete(
        `/api/queues/${queueName}/acknowledged-messages/${messageId}?ns=${ns}&sequenceId=${sequenceId}`
    );
};

export const purgeAcknowledgedMessages = async (ns: string, queueName: string) => {
    return axios.delete(`/api/queues/${queueName}/pending-messages?ns=${ns}`);
};

export const purgeDeadLetteredMessages = async (ns: string, queueName: string) => {
    return axios.delete(`/api/queues/${queueName}/dead-lettered-messages?ns=${ns}`);
};

export const purgePendingMessages = async (ns: string, queueName: string) => {
    return axios.delete(`/api/queues/${queueName}/pending-messages?ns=${ns}`);
};

export const purgePendingMessagesWithPriority = async (ns: string, queueName: string) => {
    return axios.delete(`/api/queues/${queueName}/pending-messages-with-priority?ns=${ns}`);
};
