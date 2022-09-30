export enum EMessagePriority {
    LOWEST = 7,
    VERY_LOW = 6,
    LOW = 5,
    NORMAL = 4,
    ABOVE_NORMAL = 3,
    HIGH = 2,
    VERY_HIGH = 1,
    HIGHEST = 0
}

export interface IMessageQueue {
    name: string;
    ns: string;
}

export interface IMessageState {
    uuid: string;
    publishedAt: number | null;
    scheduledAt: number | null;
    scheduledCronFired: boolean;
    scheduledRepeatCount: number;
    attempts: number;
    nextScheduledDelay: number;
    nextRetryDelay: number;
    expired: boolean;
}

export enum EExchangeType {
    DIRECT,
    FANOUT,
    TOPIC,
}

export type TTopicParams = {
    topic: string;
    ns: string;
};

export interface IExchangeParams<
    TBindingParams,
    TBindingType extends EExchangeType,
    > {
    exchangeTag: string;
    destinationQueue: IMessageQueue | null;
    bindingParams: TBindingParams;
    type: TBindingType;
}

export type IDirectExchangeParams = IExchangeParams<
    IMessageQueue | string,
    EExchangeType.DIRECT
    >;

export type IFanOutExchangeParams = IExchangeParams<
    string,
    EExchangeType.FANOUT
    >;

export type ITopicExchangeParams = IExchangeParams<
    TTopicParams | string,
    EExchangeType.TOPIC
    >;

export interface IMessage {
    createdAt: number;
    ttl: number;
    retryThreshold: number;
    retryDelay: number;
    consumeTimeout: number;
    body: unknown;
    scheduledCron: string | null;
    scheduledDelay: number | null;
    scheduledRepeatPeriod: number | null;
    scheduledRepeat: number;
    priority: number | null;
    queue: IMessageQueue | null;
    messageState: IMessageState;
    exchange:
        | IDirectExchangeParams
        | ITopicExchangeParams
        | IFanOutExchangeParams
        | null;
}

