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
    priority: number | null;
    expired: boolean;
    queue: {
        ns: string;
        name: string;
    };
}
