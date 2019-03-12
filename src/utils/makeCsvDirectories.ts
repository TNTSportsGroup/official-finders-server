import fs from "fs";
import path from "path";

export const makeCsvDirectories = async () => {
  fs.access(path.resolve(__dirname + "/../csvs"), err => {
    if (err) {
      fs.mkdirSync(path.resolve(__dirname + "/../csvs"));
      fs.mkdirSync(path.resolve(__dirname + "/../csvs/payroll"));
      fs.mkdirSync(path.resolve(__dirname + "/../csvs/invoices"));
      fs.mkdirSync(path.resolve(__dirname + "/../csvs/quickscores"));
    }
  });
};
