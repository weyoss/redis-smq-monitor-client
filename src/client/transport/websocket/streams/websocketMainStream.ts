export type TWebsocketMainStreamPayload = {
    scheduledMessagesCount: number;
    queuesCount: number;
    deadLetteredMessagesCount: number;
    acknowledgedMessagesCount: number;
    pendingMessagesCount: number;
    pendingMessagesWithPriorityCount: number;
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
    deadLetteredMessagesCount: number;
    acknowledgedMessagesCount: number;
    pendingMessagesCount: number;
    pendingMessagesWithPriorityCount: number;
    consumersCount: number;
};
