import { matchSeasonAndYear } from "../utils/quickscores/matchSeasonAndYear";

describe("matchSeasonAndYear", () => {
  test("Match Spring with year variations", () => {
    const matchSpring = matchSeasonAndYear("Spring", 2019);

    expect(matchSpring("Spring 2019")).toBe(true);
    expect(matchSpring("Spring 2018-2019")).toBe(true);
    expect(matchSpring("Spring 2019-2020")).toBe(true);
  });

  test("Match Winter with year variations", () => {
    const matchWinter = matchSeasonAndYear("Winter", 2019);

    expect(matchWinter("Winter 2019")).toBe(true);
    expect(matchWinter("Winter 2018-2019")).toBe(true);
    expect(matchWinter("Winter 2019-2020")).toBe(true);
  });
});
