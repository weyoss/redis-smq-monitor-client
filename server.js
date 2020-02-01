'use strict';

const path = require('path');
const Socket = require('socket.io');
const http = require('http');
const redis = require('redis');
const serveStatic = require('serve-static');
const finalHandler = require('finalhandler');

/**
 *
 * @param {object} config
 * @return {object}
 */
function server(config = {}) {
    if (!config.monitor || !config.monitor.enabled) {
        throw new Error('WebSocket server is not enabled!');
    }

    const { host = '0.0.0.0', port = 7210, socketOpts = {} } = config.monitor;
    return {
        /**
         *
         * @param {function} cb
         */
        listen(cb) {
            const serve = serveStatic(path.resolve(`${__dirname}/dist`), {
                index: 'index.html',
                dotfiles: 'deny'
            });
            const server = http.createServer((req, res) => {
                serve(req, res, finalHandler(req, res));
            });
            const io = Socket(server, socketOpts);

            const options = config.redis && config.redis.options || {};
            const client = redis.createClient(options);
            client.on('ready', () => {
                client.subscribe('stats');
            });
            client.on('message', (channel, message) => {
                const json = JSON.parse(message);
                io.emit('stats', json);
            });
            server.listen(port, host, () => {
                console.log(`Listening for new connections  on ${host}:${port}...`);
                cb && cb();
            });
        },
    };
}

module.exports = server;
