export type TWebsocketMainStreamPayload = {
    scheduledMessagesCount: number;
    queuesCount: number;
    deadLetteredMessagesCount: number;
    acknowledgedMessagesCount: number;
    pendingMessagesCount: number;
    consumersCount: number;
    queues: {
        [ns: string]: {
            [queueName: string]: TWebsocketMainStreamPayloadQueue;
        };
    };
};

export type TWebsocketMainStreamPayloadQueue = {
    name: string;
    ns: string;
    priorityQueuing: boolean;
    type: EQueueType;
    rateLimit: {
        interval: number;
        limit: number;
    } | null;
    deadLetteredMessagesCount: number;
    acknowledgedMessagesCount: number;
    pendingMessagesCount: number;
    consumersCount: number;
};

export enum EQueueType {
    LIFO_QUEUE,
    FIFO_QUEUE,
    PRIORITY_QUEUE,
}
