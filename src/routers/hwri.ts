import path from "path";
import fs from "fs";
import express from "express";
import { scrapeHwrInvoices } from "../utils/scrape/scrapeHwrInvoices";

export const hwriRouter = express.Router();

hwriRouter.post("/", (req, res) => {
  if (req.files && req.files.file) {
    let file: any = req.files.file;

    const { data } = file;
    let html = data.toString();
    const invoiceData = scrapeHwrInvoices(html);

    console.log(invoiceData);
  }
});
