import { redis } from "../../redis";

export const writeObjWithRedis = async (obj: any) => {
  await redis.set("obj", JSON.stringify(obj));
};

export const getObjWithRedis = async () => {
  const string = await redis.get("obj");

  return JSON.parse(string);
};
