import Socket from 'socket.io';
import http from 'http';
import ServeStatic from 'serve-static';
import finalHandler from 'finalhandler';
import { ConfigInterface } from './config/contract';
import getRedisClient from './redis';

/**
 *
 * @param {object} config
 * @return {object}
 */
function server(config?: ConfigInterface) {
    if (!config) {
        throw new Error('Configuration object is required.');
    }
    if (typeof config !== 'object') {
        throw new Error('Invalid argument type');
    }
    if (!config.monitor || !config.monitor.enabled) {
        throw new Error('RedisSMQ monitor is not enabled. Exiting...');
    }
    const { host = '0.0.0.0', port = 7210, socketOpts = {} } = config.monitor;
    return {
        /**
         *
         * @param {function} cb
         */
        listen(cb?: Function) {
            const serve = ServeStatic(`./assets/`, {
                index: 'index.html',
                dotfiles: 'deny'
            });
            const server = http.createServer((req: any, res: any) => {
                serve(req, res, finalHandler(req, res));
            });
            const io = Socket(server, socketOpts);
            getRedisClient(config, (client) => {
                console.log(`Successfully connected to RedisSMQ server.`);
                client.subscribe('stats');
                client.on('message', (channel, message) => {
                    const json = JSON.parse(message);
                    io.emit('stats', json);
                });
            });
            server.listen(port, host, () => {
                console.log(`Listening for HTTP connections on ${host}:${port}...`);
                cb && cb();
            });
        }
    };
}

export default server;
