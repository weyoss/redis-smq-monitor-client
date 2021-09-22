
![RedisSMQ Monitor](./screenshots/monitor.png?hash=1237)

# RedisSMQ Monitor

The RedisSMQ Monitor is an interface which let you monitor and debug your 
[RedisSMQ message queue](https://github.com/weyoss/redis-smq) from a web browser in real-time.

Starting from version RedisSMQ v1.1.0, the monitor has split up into a standalone project and was packaged under
[RedisSMQ Monitor](https://github.com/weyoss/redis-smq-monitor)

## Installation

RedisSMQ includes `redis-smq-monitor` as an integral part of its package. To use the monitor utility, you should install
`redis-smq` and then run the monitor server.

```text
npm install redis-smq --save
```

# Configuration

```javascript
'use strict';

const config = {
    redis: {
        client: 'redis',
        options: {
            host: '127.0.0.1',
            port: 6379,
            connect_timeout: 3600000,
        }
    },
    monitor: {
        enabled: true,
        host: '127.0.0.1',
        port: 3000,
    },
};

modules.export = config;
```

Please referer to [RedisSMQ configuration](https://github.com/weyoss/redis-smq#configuration) for more details.

## Usage

```javascript
'use strict';

const config = require('./config');
const { MonitorServer } = require('redis-smq');

monitor(config).listen(() => {
    console.log('It works!')
});
```

## Contributing

So you are interested in contributing to this project? Please see [CONTRIBUTING.md](https://github.com/weyoss/guidelines/blob/master/CONTRIBUTIONS.md).

## License

[MIT](https://github.com/weyoss/redis-smq/blob/master/LICENSE)