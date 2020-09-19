"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const contract_1 = require("./config/contract");
const ioredis_1 = __importDefault(require("ioredis"));
const redis_1 = __importDefault(require("redis"));
function getRedisClient(config, cb) {
    const redisOpts = config.redis;
    let client = null;
    if (redisOpts.driver) {
        if (![contract_1.RedisDriver.IOREDIS, contract_1.RedisDriver.REDIS].includes(redisOpts.driver)) {
            throw new Error('Invalid driver name');
        }
        const driverOptions = redisOpts.options || {};
        client =
            redisOpts.driver === contract_1.RedisDriver.REDIS
                ? redis_1.default.createClient(driverOptions)
                : new ioredis_1.default(driverOptions);
    }
    else {
        client = redis_1.default.createClient(redisOpts);
    }
    client.on('ready', () => cb(client));
}
exports.default = getRedisClient;
//# sourceMappingURL=redis.js.map