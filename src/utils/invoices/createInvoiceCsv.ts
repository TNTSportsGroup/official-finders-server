const createCsvWriter = require("csv-writer").createObjectCsvWriter;
import * as shortid from "shortid";
import fs from "fs";
import path from "path";
import { Header } from "../payroll/createPayrollCsv";
import { IGameInvoice } from "./scrapeHwrInvoices";

export const createInvoiceCsvs = (headers: Header[], records) => {
  const folderName = shortid.generate();
  fs.mkdirSync(path.resolve(__dirname + `/../csvs/invoices/${folderName}`));

  const keys = Object.keys(records);

  for (const key of keys) {
    const csvWriter = createCsvWriter({
      path: path.resolve(
        __dirname + `/../csvs/invoices/${folderName}/${key}.csv`
      ),
      header: headers
    });

    csvWriter
      .writeRecords(records[key].games)
      .then(() => {
        console.log("...Done");
      })
      .catch(e => {
        console.log(e);
      });
  }

  return folderName;
};
