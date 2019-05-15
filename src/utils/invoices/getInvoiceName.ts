import { removeParenthesis } from "../removeParenthesis";

export const getInvoiceName = (name: string) => {
  const reg = /\([a-zA-Z | \s | \D]*\)/g;

  const matches = name.match(reg);
  if (matches && matches.length > 0) {
    const firstMatch = matches[0];
    return removeParenthesis(firstMatch);
  }
  return "";
};
