import { redis } from "../../redis";

export const writeObjWithRedis = async (name: string, obj: any) => {
  await redis.set(name, JSON.stringify(obj));
};

export const getObjWithRedis = async (season: string) => {
  const string = await redis.get(season);

  return JSON.parse(string);
};
