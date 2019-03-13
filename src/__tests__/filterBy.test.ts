import { filterBy } from "../utils/quickscores/filterBy";

describe("filterBy", () => {
  test("test filterBy", () => {
    const filterByString = filterBy(arg => typeof arg === "string");
    const result = filterByString(["a", "b", 4, 5, "c"]);

    expect(result).toEqual(["a", "b", "c"]);
  });
});
