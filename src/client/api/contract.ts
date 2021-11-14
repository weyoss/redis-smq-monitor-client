import { IMessage } from '../types/IMessage';

export interface IGetQueueMessagesResponse {
    total: number;
    items: {
        sequenceId: number;
        message: IMessage;
    }[];
}
