import {
  getSeasonList,
  getLastEntryInSeasonList,
  addDataNameToSeasonList,
  flushall,
  quitRedisConnection,
  pingRedis
} from "../utils/quickscores/redis-controller";





beforeEach(async() => {
  await flushall();

  
});

afterAll(async() => {
 await quitRedisConnection();
 
})

describe("Redis-Controller", () => {
  test("Connection is working", async() => {
    const redisResponse =  await pingRedis()

    expect(redisResponse).toBe('PONG')
  })
  test("Adding to list", async () => {
    await addDataNameToSeasonList("winter-2017-Nov-06", "Winter 2017");
    await addDataNameToSeasonList("winter-2017-Nov-07", "Winter 2017");
    await addDataNameToSeasonList("winter-2017-Nov-08", "Winter 2017");

    const lastItem = await getLastEntryInSeasonList("Winter 2017");

    expect(lastItem).toEqual(
      "winter-2017-Nov-08",
      
    );

   
    
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
});
