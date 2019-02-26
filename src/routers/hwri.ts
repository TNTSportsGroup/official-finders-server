import path from "path";
import fs from "fs";
import express from "express";
import { scrapeHwrInvoices } from "../utils/scrape/scrapeHwrInvoices";
import { createInvoiceObj } from "../utils/createInvoiceObj";

export const hwriRouter = express.Router();

hwriRouter.post("/", (req, res) => {
  if (req.files && req.files.file) {
    let file: any = req.files.file;

    const { data } = file;
    let html = data.toString();
    const invoiceData = scrapeHwrInvoices(html);
    const invoiceMasterObj = createInvoiceObj(invoiceData);
    const invoiceKeys = Object.keys(invoiceMasterObj);

    let totalNumberOfGames = 0;
    Object.keys(invoiceMasterObj).forEach(key => {
      totalNumberOfGames += invoiceMasterObj[key].games.length;
    });

    res.send({
      keys: invoiceKeys,
      data: invoiceMasterObj,
      totalNumberOfGames
    });
  }
});
