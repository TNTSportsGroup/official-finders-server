import { matchSeasonAndYear } from "../utils/quickscores/matchSeasonAndYear";

describe("matchSeasonAndYear", () => {
  test("Match Spring with year variations", () => {
    const matchSpring = matchSeasonAndYear("Spring", 2019);

    expect(matchSpring("Spring 2019")).toBe("Spring 2019");
    expect(matchSpring("Spring 2018-2019")).toBe("Spring 2018-2019");
    expect(matchSpring("Spring 2019-2020")).toBe("Spring 2019-2020");
  });

  test("Match Winter with year variations", () => {
    const matchSpring = matchSeasonAndYear("Winter", 2019);

    expect(matchSpring("Winter 2019")).toBe("Winter 2019");
    expect(matchSpring("Winter 2018-2019")).toBe("Winter 2018-2019");
    expect(matchSpring("Winter 2019-2020")).toBe("Winter 2019-2020");
  });
});
