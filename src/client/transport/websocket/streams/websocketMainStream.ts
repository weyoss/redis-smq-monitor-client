export type TWebsocketMainStreamPayload = {
    scheduledMessagesCount: number;
    queuesCount: number;
    deadLetteredMessagesCount: number;
    acknowledgedMessagesCount: number;
    pendingMessagesCount: number;
    pendingMessagesWithPriorityCount: number;
    producersCount: number;
    consumersCount: number;
    multiQueueProducersCount: number;
    queues: {
        [ns: string]: {
            [queueName: string]: TWebsocketMainStreamPayloadQueue;
        };
    };
};

export type TWebsocketMainStreamPayloadQueue = {
    name: string;
    ns: string;
    deadLetteredMessagesCount: number;
    acknowledgedMessagesCount: number;
    pendingMessagesCount: number;
    pendingMessagesWithPriorityCount: number;
    producersCount: number;
    consumersCount: number;
};
