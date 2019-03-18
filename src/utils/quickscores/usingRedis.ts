import { redis } from "../../redis";

export const writeQuickScoreDataToRedis = async (name: string, obj: any) => {
  await redis.set(name, JSON.stringify(obj));
};

export const getQuickScoreDataFromRedis = async (season: string) => {
  const string = await redis.get(season);

  return JSON.parse(string);
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

  return seasonList[0];
};

export const addDataNameToSeasonList = async (data: string, key: string) => {
  await redis.lpush(key, data);
};
