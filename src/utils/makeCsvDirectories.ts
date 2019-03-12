import fs from "fs";
import path from "path";

export const makeCsvDirectories = async () => {
  fs.access(path.resolve(__dirname + "/../nani"), err => {
    console.log(err);
    if (err) {
      fs.mkdirSync(path.resolve(__dirname + "/../nani"));
      fs.mkdirSync(path.resolve(__dirname + "/../nani/payroll"));
      fs.mkdirSync(path.resolve(__dirname + "/../nani/invoices"));
      fs.mkdirSync(path.resolve(__dirname + "/../nani/quickscores"));
    }
  });
};
