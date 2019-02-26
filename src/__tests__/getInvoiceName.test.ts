import { getInvoiceName } from "../utils/getInvoiceName";

describe("getInvoiceName", () => {
  test("single parenthese", () => {
    const str = "(Carol Stream PD - Dodgeball) 6th Grade In-House";
    expect(getInvoiceName(str)).toBe("Carol Stream PD - Dodgeball");
  });
});
