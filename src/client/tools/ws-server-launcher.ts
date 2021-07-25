import server from '../../server';
import { RedisDriver } from '../../server/config/contract';

const instance = server({
    redis: {
        driver: RedisDriver.REDIS,
        options: {
            host: 'localhost'
        }
    },
    monitor: {
        enabled: true,
        port: 4000,
        host: '0.0.0.0'
    }
});

instance.listen(() => {
    console.log('Server is UP...');
});
