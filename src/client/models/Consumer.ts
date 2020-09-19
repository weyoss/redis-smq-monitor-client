export interface Consumer {
    id: string;
    rates: {
        processing: number;
        acknowledged: number;
        unacknowledged: number;
    };
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
