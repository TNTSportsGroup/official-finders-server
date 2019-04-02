import { matchSport } from "../utils/quickscores/matchSport";

describe("matchSport", () => {
  test("test matchSport", () => {
    expect(matchSport("Basketball", "Adult Basketball")).toBe(true);
    expect(matchSport("Basketball", "Adult Baseball")).toBe(false);
  });
});
