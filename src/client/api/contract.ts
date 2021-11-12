import { IMessage } from '../types/IMessage';

export interface IGetQueuePendingMessagesResponse {
    total: number;
    items: {
        sequenceId: number;
        message: IMessage;
    }[];
}
