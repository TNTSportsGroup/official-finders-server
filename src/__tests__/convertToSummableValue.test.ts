import { convertToSummableValue } from "../utils/convertToSummableValue";
describe("convertToSummableValue", () => {
  test("returns proper int with string with $", () => {
    expect(convertToSummableValue("$10.00")).toBe(10.0);
    expect(convertToSummableValue("$500.00")).toBe(500.0);
    expect(convertToSummableValue("$45.00")).toBe(45.0);
  });
});
