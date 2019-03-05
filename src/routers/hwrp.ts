import path from "path";
import fs from "fs";
import express from "express";
import { scrapeHWRP } from "../utils/payroll/scrapeHwrp";
import { createPayrollCsv } from "../utils/payroll/createPayrollCsv";
import { extractNegativesAndPositives } from "../utils/payroll/extractNegativesAndPositives";

export const hwrpRouter = express.Router();

hwrpRouter.get("/:name", (req, res) => {
  const pathToFile = path.resolve(
    __dirname + `/../csvs/payroll/${req.params.name}`
  );

  try {
    if (fs.existsSync(pathToFile)) {
      res.sendFile(pathToFile, "payroll.csv", e => {
        if (e) {
          console.log(e);
        }
      });
    }
  } catch (err) {
    res.status(404).send({
      error: "file does not exist"
    });
  }
});

hwrpRouter.post("/", (req, res) => {
  if (req.files && req.files.file) {
    let file: any = req.files.file;

    const { data } = file;
    let html = data.toString();

    const userData = scrapeHWRP(html);

    const { positivePayment, negativePayment } = extractNegativesAndPositives(
      userData
    );

    const headers = [
      {
        id: "name",
        title: "Receiver Name"
      },
      {
        id: "amount",
        title: "Receiver Amount"
      }
    ];

    const name = createPayrollCsv(headers, positivePayment);

    res.send({
      userData: positivePayment,
      fileName: name,
      negative: negativePayment
    });
  }
});
