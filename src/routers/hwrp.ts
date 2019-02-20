import express from "express";
import { scrapeHWRP } from "../utils/scrapeHwrp";

export const hwrpRouter = express.Router();

hwrpRouter.post("/", (req, res) => {
  if (req.files && req.files.file) {
    let file: any = req.files.file;
    const { data } = file;
    let html = data.toString();

    const userData = scrapeHWRP(html);
    console.log(userData);
  }

  res.send("hi");
});
