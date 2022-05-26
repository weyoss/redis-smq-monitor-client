// Using redis-smq from a local repository
// Fix this according to your preferences
import { RedisClientName } from '../../../../redis-smq-common/dist/types';
import { MonitorServer } from '../../../../redis-smq-monitor';
import { TConfig } from '../../../../redis-smq-monitor/dist/types';
import { logger } from '../../../../redis-smq-common';

export const config: TConfig = {
    redis: {
        client: RedisClientName.IOREDIS,
        options: {
            host: '127.0.0.1',
            port: 6379
        }
    },
    logger: {
        enabled: true
    },
    server: {
        port: 3000,
        host: '127.0.0.1'
    }
};

logger.setLogger(console);

const server = MonitorServer.createInstance(config);
server.listen();
