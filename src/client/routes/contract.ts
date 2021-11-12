export interface IQueueRouteParams {
    queueName: string;
    namespace: string;
}

export interface IConsumerRouteParams extends IQueueRouteParams {
    consumerId: string;
}
