import { IMessage } from '../../types/IMessage';

export interface IGetQueueMessagesResponse {
    data: {
        total: number;
        items: {
            sequenceId: number;
            message: IMessage;
        }[];
    };
}
