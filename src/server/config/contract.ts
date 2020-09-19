import { ServerOptions } from 'socket.io';
import { Redis, RedisOptions } from 'ioredis';
import { ClientOpts, RedisClient } from 'redis';

export enum RedisDriver {
    REDIS = 'redis',
    IOREDIS = 'ioredis'
}

export type RedisClientType = Redis | RedisClient;

export interface RedisOptionsInterface {
    driver: RedisDriver;
    options?: RedisOptions | ClientOpts;
}

export interface ConfigInterface {
    redis: RedisOptionsInterface | ClientOpts;
    monitor?: {
        enabled?: boolean;
        port?: number;
        host?: string;
        socketOpts?: ServerOptions;
    };
}
