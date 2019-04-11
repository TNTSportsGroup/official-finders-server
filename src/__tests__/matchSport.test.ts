import { matchSport } from "../utils/quickscores/matchSport";

describe("matchSport", () => {
  test("test matchSport", () => {
    expect(matchSport("Basketball", "Adult Basketball")).toBe(true);
    expect(matchSport("Basketball", "Adult Baseball")).toBe(false);

    expect(matchSport("Soccer", "Adult Soccer")).toBe(true);
    expect(matchSport("Soccer", "Adult Baseball")).toBe(false);
    expect(matchSport("Soccer", "Youth Soccer")).toBe(true);
    expect(matchSport("Soccer", "Adult Volleyball")).toBe(false);
    expect(matchSport("Youth Soccer", "Soccer")).toBe(false);
  });
});
