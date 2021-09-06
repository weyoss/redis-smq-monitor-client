import { MonitorServer } from '../../server';
import { RedisClientName } from '../../../types';

const instance = MonitorServer({
    redis: {
        client: RedisClientName.REDIS,
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
