import IORedis from "ioredis";
import { keys } from "./keys";
import IORedisMock from 'ioredis-mock'

// made an instance of redis and exported it.
export let redis: IORedis.Redis;



if(process.env.NODE_ENV === "test") {
  redis = new IORedisMock();
} else {
  redis = new IORedis({
    port: parseInt(keys.REDIS_PORT) || 6379,
    host: keys.REDIS_HOST || 'redis',
    enableReadyCheck: true
  });
}




