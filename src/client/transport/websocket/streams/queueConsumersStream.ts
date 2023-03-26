export type TWebsocketQueueConsumersPayload = {
    [id: string]: TWebsocketQueueConsumersPayloadConsumerInfo;
};

export type TWebsocketQueueConsumersPayloadConsumerInfo = {
    ipAddress: string[];
    hostname: string;
    pid: number;
    createdAt: number;
}