import { getInvoiceName } from "../utils/getInvoiceName";

describe("getInvoiceName", () => {
  test("single parenthesis", () => {
    const str = "(Carol Stream PD - Dodgeball) 6th Grade In-House";
    const str2 = "(Streamwood PD - Basketball) 8th Grade Boys In-House";
    expect(getInvoiceName(str)).toBe("Carol Stream PD - Dodgeball");
    expect(getInvoiceName(str2)).toBe("Streamwood PD - Basketball");
  });

  test("double parenthesis", () => {
    const str = "(YMCA Downers Grove (IBY) - Basketball)";

    expect(getInvoiceName(str)).toBe("YMCA Downers Grove IBY - Basketball");
  });
});
