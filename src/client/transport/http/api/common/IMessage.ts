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

export interface IMessageMetadata {
    publishedAt: number;
    scheduledAt: number | null;
    scheduledCronFired: boolean;
    attempts: number;
    scheduledRepeatCount: number;
    expired: boolean;
    nextScheduledDelay: number;
    nextRetryDelay: number;
    uuid: string;
}

export interface IMessage {
    createdAt: number;
    ttl: number | null;
    retryThreshold: number | null;
    retryDelay: number | null;
    consumeTimeout: number | null;
    body: unknown;
    scheduledCron: string | null;
    scheduledDelay: number | null;
    scheduledPeriod: number | null;
    scheduledRepeat: number;
    priority: EMessagePriority | null;
    queue: {
        ns: string;
        name: string;
    };
    metadata: IMessageMetadata;
}
