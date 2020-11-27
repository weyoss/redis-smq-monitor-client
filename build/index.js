"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = __importDefault(require("socket.io"));
const http_1 = __importDefault(require("http"));
const serve_static_1 = __importDefault(require("serve-static"));
const fs_1 = require("fs");
const redis_1 = __importDefault(require("./redis"));
function Server(config) {
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
            const fallback = (req, res) => {
                return () => {
                    fs_1.readFile(`${__dirname}/assets/index.html`, (err, content) => {
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.end(content);
                    });
                };
            };
            const serve = serve_static_1.default(`${__dirname}/assets/`, {
                index: 'index.html',
                dotfiles: 'deny'
            });
            const server = http_1.default.createServer((req, res) => {
                serve(req, res, fallback(req, res));
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
exports.default = Server;
exports.Monitor = __importStar(require("./config/contract"));
//# sourceMappingURL=index.js.map