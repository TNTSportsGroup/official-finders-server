import path from "path";
import express from "express";
import { scrapeHWRP } from "../utils/scrapeHwrp";
import { createPayrollCsv } from "../utils/createPayrollCsv";
import { extractNegativesAndPositives } from "../utils/extractNegativesAndPositives";

export const hwrpRouter = express.Router();

hwrpRouter.get("/:name", (req, res) => {
  res.sendFile(
    path.resolve(__dirname + `/../csvs/${req.params.name}`),
    "payroll.csv",
    e => {
      if (e) {
        console.log(e);
      }
    }
  );
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
        title: "Name"
      },
      {
        id: "payment",
        title: "Payment"
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
