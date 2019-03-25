import {
  getSeasonList,
  getLastEntryInSeasonList,
  addDataNameToSeasonList,
  flushall,
  closeRedisConnection
} from "../utils/quickscores/redis-controller";

beforeEach(async(done) => {
  await flushall();

  done();
});

afterAll(async(done) => {
  await closeRedisConnection();
  done()
})

describe("Redis-Controller", () => {
  test("Adding to list", async done => {
    await addDataNameToSeasonList("winter-2017-Nov-06", "Winter 2017");
    await addDataNameToSeasonList("winter-2017-Nov-07", "Winter 2017");
    await addDataNameToSeasonList("winter-2017-Nov-08", "Winter 2017");

    const currentList = await getSeasonList("Winter 2017");

    expect(currentList).toEqual([
      "winter-2017-Nov-08",
      "winter-2017-Nov-07",
      "winter-2017-Nov-06"
    ]);

    done();
    
  }, 50000);
});
