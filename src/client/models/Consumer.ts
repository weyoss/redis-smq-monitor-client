import { ConsumerRates } from './Rates';

export interface Consumer {
    id: string;
    namespace: string;
    queueName: string;
    rates: ConsumerRates;
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
