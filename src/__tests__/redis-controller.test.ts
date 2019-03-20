import Redis from "ioredis-mock";
import {
  getSeasonList,
  getLastEntryInSeasonList,
  addDataNameToSeasonList,
  flushall
} from "../utils/quickscores/redis-controller";

// const redis = new Redis();

beforeEach(() => {
  flushall();
});

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
  });
});
