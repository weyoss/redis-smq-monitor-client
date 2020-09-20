"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const socket_io_1 = __importDefault(require("socket.io"));
const http_1 = __importDefault(require("http"));
const serve_static_1 = __importDefault(require("serve-static"));
const finalhandler_1 = __importDefault(require("finalhandler"));
const redis_1 = __importDefault(require("./redis"));
function server(config) {
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
        listen(cb) {
            const serve = serve_static_1.default(`./assets/`, {
                index: 'index.html',
                dotfiles: 'deny'
            });
            const server = http_1.default.createServer((req, res) => {
                serve(req, res, finalhandler_1.default(req, res));
            });
            const io = socket_io_1.default(server, socketOpts);
            console.log('Connecting to Redis server...');
            redis_1.default(config, (err, client) => {
                if (err) {
                    console.log('An error occurred while trying to connect to Redis server.');
                    throw err;
                }
                console.log('Successfully connected to Redis server.');
                client.subscribe('stats');
                client.on('message', (channel, message) => {
                    const json = JSON.parse(message);
                    io.emit('stats', json);
                });
                server.listen(port, host, () => {
                    console.log(`Listening for HTTP connections on ${host}:${port}...`);
                    cb && cb();
                });
            });
        }
    };
}
module.exports = server;
//# sourceMappingURL=index.js.map