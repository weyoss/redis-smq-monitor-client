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

export interface IMessageMetadata {
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
    queue: IMessageQueue;
    metadata: IMessageMetadata;
}

