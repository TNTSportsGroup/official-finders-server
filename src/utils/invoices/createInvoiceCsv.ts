const createCsvWriter = require("csv-writer").createObjectCsvWriter;
import * as shortid from "shortid";
import child_process from "child_process";
import fs from "fs";

import path from "path";

import { Header } from "../payroll/createPayrollCsv";

const fsPromises = fs.promises;

export const createInvoiceCsvs = async (headers: Header[], records) => {
  const folderName = shortid.generate();

  const keys = Object.keys(records);
  try {
    await fsPromises.mkdir(
      path.resolve(__dirname + `/../../csvs/invoices/${folderName}`),
      {
        recursive: true
      }
    );
  } catch (error) {
    console.log(error);
  }

  for (const key of keys) {
    const csvWriter = createCsvWriter({
      path: path.resolve(
        __dirname + `/../../csvs/invoices/${folderName}/${key}.csv`
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

  child_process.exec(`zip -r invoice *`, {
    cwd: path.resolve(__dirname + `/../../csvs/invoices/${folderName}`)
  });

  return folderName;
};
