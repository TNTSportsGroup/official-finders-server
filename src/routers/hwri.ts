import path from "path";
import fs from "fs";
import child_process from "child_process";
import express from "express";

import { scrapeHwrInvoices } from "../utils/invoices/scrapeHwrInvoices";
import {
  createInvoiceObj,
  getCompleteTotal
} from "../utils/invoices/createInvoiceObj";
import { createInvoiceCsvs } from "../utils/invoices/createInvoiceCsv";

const fsPromises = fs.promises;

export const hwriRouter = express.Router();

hwriRouter.get("/:folderName", (req, res) => {
  const pathToFolder = path.resolve(
    __dirname + `/../csvs/invoices/${req.params.folderName}`
  );

  fs.exists(path.resolve(pathToFolder + "invoice.zip"), exist => {
    console.log(exist);
    if (!exist) {
      console.log("i ran");
      child_process.exec(`zip -v invoice *`, {
        cwd: pathToFolder
      });
    }
    res.sendFile(path.resolve(pathToFolder + "/invoice.zip"), {
      headers: {
        "content-type": "application/zip"
      }
    });
  });
});

hwriRouter.post("/", async (req, res) => {
  if (req.files && req.files.file) {
    let file: any = req.files.file;

    const { data } = file;
    let html = data.toString();
    const invoiceData = scrapeHwrInvoices(html);
    const invoiceMasterObj = createInvoiceObj(invoiceData);
    const completeTotal = getCompleteTotal(invoiceMasterObj);

    const invoiceKeys = Object.keys(invoiceMasterObj);

    let totalNumberOfGames = 0;
    Object.keys(invoiceMasterObj).forEach(key => {
      totalNumberOfGames += invoiceMasterObj[key].games.length;
    });

    const headers = [
      { id: "ID", title: "ID" },
      { id: "Game Date", title: "Game Date" },
      { id: "Type", title: "Type" },
      { id: "Home Team", title: "Home Team" },
      { id: "Away Team", title: "Away Team" },
      {
        id: "Facility",
        title: "Facility"
      },
      {
        id: "Total",
        title: "Total"
      },
      {
        id: "Grand Total",
        title: "Grand Total"
      }
    ];

    const folderName = await createInvoiceCsvs(headers, invoiceMasterObj);

    res.send({
      keys: invoiceKeys,
      data: invoiceMasterObj,
      totalNumberOfGames,
      folderName,
      completeTotal
    });
  }
});
