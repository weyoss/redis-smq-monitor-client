import { IConsumerRates } from './IRates';

export interface IConsumer {
    id: string;
    namespace: string;
    queueName: string;
    rates: IConsumerRates;
    resources: {
        pid: number;
        hostname: string;
        ipAddress: string[];
        ram: {
            usage: {
                rss: number;
            };
            free: number;
            total: number;
        };
        cpu: {
            user: number;
            system: number;
            percentage: string;
        };
    };
}
