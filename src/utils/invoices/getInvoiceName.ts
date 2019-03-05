import { removeParenthesis } from "../removeParenthesis";

export const getInvoiceName = (name: string) => {
  const reg = /\([a-zA-Z | \s | \D]*\)/g;

  const matches = name.match(reg);
  const firstMatch = matches[0];
  return removeParenthesis(firstMatch);
};
