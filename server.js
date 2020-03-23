'use strict';

const path = require('path');
const Socket = require('socket.io');
const http = require('http');
const redis = require('redis');
const IORedis = require('ioredis');
const serveStatic = require('serve-static');
const finalHandler = require('finalhandler');


function redisClient(config, cb) {
    const { redis: redisParams = {} } = config;
    let driver = 'redis';
    let driverOptions = {};
    if (redisParams.driver) {
        driver = redisParams.driver;
        if (redisParams.options) driverOptions = redisParams.options;
    } else driverOptions = redisParams;
    const client = (driver === 'ioredis') ? new IORedis(driverOptions)
        : redis.createClient(driverOptions);
    client.on('ready', () => {
        cb(client);
    });
}

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
            redisClient(config, (client) => {
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
        },
    };
}

module.exports = server;
