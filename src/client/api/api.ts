import axios from 'axios';
import { IGetQueuePendingMessagesResponse } from './contract';

export const getQueuePendingMessages = async (ns: string, queueName: string, skip: number, take: number) => {
    const response = await axios.get<{ data: IGetQueuePendingMessagesResponse }>(
        `/api/queues/${queueName}/pending-messages?ns=${ns}&skip=${skip}&take=${take}`
    );
    return response.data.data;
};

export const deleteQueuePendingMessage = async (
    ns: string,
    queueName: string,
    messageId: string,
    sequenceId: number
) => {
    await axios.delete(`/api/queues/${queueName}/pending-messages/${messageId}?ns=${ns}&sequenceId=${sequenceId}`);
};
