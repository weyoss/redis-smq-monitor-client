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
    rateLimit: {
        interval: number;
        limit: number;
    } | null;
    deadLetteredMessagesCount: number;
    acknowledgedMessagesCount: number;
    pendingMessagesCount: number;
    consumersCount: number;
};
