export type TWebsocketHeartbeatStreamPayload = {
    timestamp: number;
    data: {
        ram: { usage: NodeJS.MemoryUsage; free: number; total: number };
        cpu: { user: number; system: number; percentage: string };
    };
};

export type TWebsocketHeartbeatIdsStreamPayload = {
    producers: string[];
    consumers: string[];
    multiQueueProducers: string[];
};
