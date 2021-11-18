import { IMessage } from '../../types/IMessage';

export interface IResponse<T> {
    data: T;
}

export type TPaginatedResponse<T> = IResponse<{
    total: number;
    items: T[];
}>;

export type TQueueMessagesResponse = TPaginatedResponse<{
    sequenceId: number;
    message: IMessage;
}>;

export type TScheduledMessagesResponse = TPaginatedResponse<IMessage>;

export type TPendingMessagesWithPriorityResponse = TPaginatedResponse<IMessage>;
