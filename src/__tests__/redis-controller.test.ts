import {
  getSeasonList,
  getLastEntryInSeasonList,
  addDataNameToSeasonList,
  flushall,
  quitRedisConnection,
  pingRedis,
  setDataToRedisHash,
  getDataFromRedisHash,
  getKeysFromRedishHash
} from "../utils/quickscores/redis-controller";

beforeEach(async () => {
  await flushall();
});

afterAll(async () => {
  await quitRedisConnection();
});

describe("Redis-Controller", () => {
  test("Connection is working", async () => {
    const redisResponse = await pingRedis();

    expect(redisResponse).toBe("PONG");
  });
  test("Adding to list", async () => {
    await addDataNameToSeasonList("winter-2017-Nov-06", "Winter 2017");
    await addDataNameToSeasonList("winter-2017-Nov-07", "Winter 2017");
    await addDataNameToSeasonList("winter-2017-Nov-08", "Winter 2017");

    const lastItem = await getLastEntryInSeasonList("Winter 2017");

    expect(lastItem).toEqual("winter-2017-Nov-08");
  });

  test("get last in list", async () => {
    await addDataNameToSeasonList("winter-2017-Nov-06", "Winter 2017");
    await addDataNameToSeasonList("winter-2017-Nov-07", "Winter 2017");
    await addDataNameToSeasonList("winter-2017-Nov-08", "Winter 2017");

    const currentList = await getSeasonList("Winter 2017");

    expect(currentList).toEqual([
      "winter-2017-Nov-08",
      "winter-2017-Nov-07",
      "winter-2017-Nov-06"
    ]);
  });

  test("test SeasonHash", async () => {
    await setDataToRedisHash("Winter-2017-f5d1f5", { name: "test" });
    await setDataToRedisHash("Winter-2017-fdinnhij52", { name: "test2" });

    expect(await getDataFromRedisHash("Winter-2017-f5d1f5")).toEqual({
      name: "test"
    });

    expect(await getDataFromRedisHash("Winter-2017-fdinnhij52")).toEqual({
      name: "test2"
    });
  });

  test("test SeasonHash listing", async () => {
    await setDataToRedisHash("Winter-2017-f5d1f5", { name: "test" });
    await setDataToRedisHash("Winter-2017-fdinnhij52", { name: "test2" });
    await setDataToRedisHash("Winter-2017-fdinjfkfni", { name: "test3" });

    expect(await getKeysFromRedishHash()).toEqual([
      "Winter-2017-f5d1f5",
      "Winter-2017-fdinnhij52",
      "Winter-2017-fdinjfkfni"
    ]);
  });
});
