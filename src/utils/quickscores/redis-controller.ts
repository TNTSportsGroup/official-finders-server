import { redis } from "../../redis";

export const writeQuickScoreDataToRedis = async (name: string, obj: any) => {
  await redis.hset(name, "SeasonHash", JSON.stringify(obj));
};

export const getQuickScoreDataFromRedis = async (name: string) => {
  const string = await redis.hget(name, "SeasonHash");

  return JSON.parse(string);
};

export const getDataFromRedisHash = async (key: string) => {
  const data = await redis.hget("SeasonHash", key);
  return JSON.parse(data);
};

export const setDataToRedisHash = async (key: string, data: any) => {
  redis.hset("SeasonHash", key, JSON.stringify(data));
};

export const getSeasonList = async (season: string) => {
  const sizeOfList = await redis.llen(season);

  if (sizeOfList === 0) {
    return null;
  }

  const completeList = await redis.lrange(season, 0, sizeOfList);

  return completeList;
};

export const getLastEntryInSeasonList = async season => {
  const seasonList = await getSeasonList(season);

  if (!seasonList) {
    return null;
  }
  // redis will push new elements to the head of the list instead of the back.
  return seasonList[0];
};

export const addDataNameToSeasonList = async (
  data: string,
  seasonName: string
) => {
  await redis.lpush(seasonName, data);
};

export const flushall = async () => {
  await redis.flushall();
};

export const quitRedisConnection = () => {
  return redis.quit();
};

export const pingRedis = () => {
  return redis.ping();
};

export const getKeysFromRedishHash = () => {
  return redis.hkeys("SeasonHash");
  // redis.hkeys("SeasonHash", (e, res) => {
  //   if (e) {
  //     console.log(e);
  //   }
  //   return res;
  // });
};
