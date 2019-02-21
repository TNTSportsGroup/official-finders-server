import express from "express";
import { scrapeHWRP } from "../utils/scrapeHwrp";
import { createPayrollCsv } from "../utils/createPayrollCsv";

export const hwrpRouter = express.Router();

hwrpRouter.post("/", (req, res) => {
  if (req.files && req.files.file) {
    let file: any = req.files.file;
    console.log(file);
    const { data } = file;
    let html = data.toString();

    const userData = scrapeHWRP(html);
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

    const name = createPayrollCsv(headers, userData);
    console.log(name);
  }

  res.send("hi");
});
