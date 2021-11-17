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

export interface IMessage {
    uuid: string;
    attempts: number;
    createdAt: number;
    ttl: number | null;
    retryThreshold: number | null;
    retryDelay: number | null;
    consumeTimeout: number | null;
    body: unknown;
    scheduledCron: string | null;
    scheduledCronFired: boolean;
    scheduledDelay: number | null;
    scheduledPeriod: number | null;
    scheduledRepeat: number;
    scheduledRepeatCount: number;
    delayed: boolean;
    priority: EMessagePriority | null;
    expired: boolean;
    queue: {
        ns: string;
        name: string;
    };
}
