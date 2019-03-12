import fs from "fs";
import path from "path";

export const makeCsvDirectories = async () => {
  // check if the csvs folder exist
  fs.access(path.resolve(__dirname + "/../csvs"), err => {
    if (err) {
      // if the csvs folder doens't exist we create the parent folder
      // payroll, invoices, and quickscores
      fs.mkdirSync(path.resolve(__dirname + "/../csvs"));
      fs.mkdirSync(path.resolve(__dirname + "/../csvs/payroll"));
      fs.mkdirSync(path.resolve(__dirname + "/../csvs/invoices"));
      fs.mkdirSync(path.resolve(__dirname + "/../csvs/quickscores"));
    }
  });
};
