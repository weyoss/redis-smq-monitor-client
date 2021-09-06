import { IConfig, TCompatibleRedisClient, RedisClientName } from '../../types';
import IORedis, { RedisOptions } from 'ioredis';
import Redis, { ClientOpts } from 'redis';

export function RedisClient(config: IConfig, cb: (err: Error | null, client: TCompatibleRedisClient) => void) {
    const { client = RedisClientName.REDIS, options = {} } = config.redis ?? {};
    if (![RedisClientName.IOREDIS, RedisClientName.REDIS].includes(client)) {
        throw new Error('Invalid Redis driver name');
    }
    const instance =
        client === RedisClientName.REDIS
            ? Redis.createClient(options as ClientOpts)
            : new IORedis(options as RedisOptions);
    instance.on('ready', () => cb(null, instance));
    instance.on('error', cb);
}
