import { removeParenthesis } from "../removeParenthesis";
import * as shortid from "shortid";

export const getInvoiceName = (name: string) => {
  //const reg = /\([a-zA-Z | \s | \D]*\)/g;
  const reg = /\(([^)]+)\)/g;

  const matches = name.match(reg);
  if (matches && matches.length > 0) {
    const firstMatch = matches[0];
    return removeParenthesis(firstMatch);
  }
  console.log(name);
  return "";
};
