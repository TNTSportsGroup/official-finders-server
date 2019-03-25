import Redis from "ioredis";
import { keys } from "./keys";

// made an instance of redis and exported it.

export const redis = new Redis({
  port: parseInt(keys.REDIS_PORT) || 6379,
  host: keys.REDIS_HOST || 'localhost',
});
