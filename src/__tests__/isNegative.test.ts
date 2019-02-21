import { isNegative } from "../utils/isNegative";

describe("isNegative", () => {
  test("checks negatives", () => {
    expect(isNegative("$-128.00")).toBe(true);
    expect(isNegative("$-10.00")).toBe(true);
    expect(isNegative("$-7.00")).toBe(true);
    expect(isNegative("$-450.00")).toBe(true);
  });

  test("checks positives", () => {
    expect(isNegative("$150.00")).toBe(false);
    expect(isNegative("$10.00")).toBe(false);
    expect(isNegative("$1650.00")).toBe(false);
    expect(isNegative("$250.00")).toBe(false);
  });
});
