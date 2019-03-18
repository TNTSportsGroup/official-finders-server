import { redis } from "../../redis";

export const writeQuickScoreDataToRedis = async (name: string, obj: any) => {
  await redis.set(name, JSON.stringify(obj));
};

export const getQuickScoreDataFromRedis = async (season: string) => {
  const string = await redis.get(season);

  return JSON.parse(string);
};
