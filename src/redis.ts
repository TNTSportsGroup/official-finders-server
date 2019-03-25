import Redis from "ioredis";
import { keys } from "./keys";

// made an instance of redis and exported it.

console.log(keys.REDIS_PORT);
console.log(keys.REDIS_HOST);
export const redis = new Redis({
  port: parseInt(keys.REDIS_PORT) || 6379,
  host: keys.REDIS_HOST || 'redis',
  enableReadyCheck: true
});
