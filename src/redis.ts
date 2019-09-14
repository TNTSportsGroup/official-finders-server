import IORedis from "ioredis";
import { keys } from "./keys";

export const redis = new IORedis({
  port: parseInt(keys.REDIS_PORT) || 6379,
  host: keys.REDIS_HOST || "localhost",
  enableReadyCheck: true
});
