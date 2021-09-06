import { ServerOptions } from 'socket.io';
import { Redis, RedisOptions } from 'ioredis';
import { ClientOpts, RedisClient } from 'redis';

export enum RedisClientName {
    REDIS = 'redis',
    IOREDIS = 'ioredis'
}

export type TCompatibleRedisClient = Redis | RedisClient;

export interface IRedisOptions {
    client: RedisClientName;
    options?: RedisOptions | ClientOpts;
}

export interface IMonitorConfig {
    enabled?: boolean;
    port?: number;
    host?: string;
    socketOpts?: ServerOptions;
}

export interface IConfig {
    redis?: IRedisOptions;
    monitor?: IMonitorConfig;
}
