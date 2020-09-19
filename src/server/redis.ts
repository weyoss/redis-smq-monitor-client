import { ConfigInterface, RedisClientType, RedisDriver, RedisOptionsInterface } from './config/contract';
import IORedis, { RedisOptions } from 'ioredis';
import Redis, { ClientOpts } from 'redis';

export default function getRedisClient(config: ConfigInterface, cb: (client: RedisClientType) => void) {
    const redisOpts = config.redis as RedisOptionsInterface;
    let client: RedisClientType | null = null;
    if (redisOpts.driver) {
        if (![RedisDriver.IOREDIS, RedisDriver.REDIS].includes(redisOpts.driver)) {
            throw new Error('Invalid driver name');
        }
        const driverOptions = redisOpts.options || {};
        client =
            redisOpts.driver === RedisDriver.REDIS
                ? Redis.createClient(driverOptions as ClientOpts)
                : new IORedis(driverOptions as RedisOptions);
    } else {
        client = Redis.createClient(redisOpts as ClientOpts);
    }
    client.on('ready', () => cb(client as RedisClientType));
}
