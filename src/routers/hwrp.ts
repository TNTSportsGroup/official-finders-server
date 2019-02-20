import express from "express";

export const hwrpRouter = express.Router();

hwrpRouter.post("/", (req, res) => {
  if (req.files && req.files.file) {
    let file: any = req.files.file;
    const { data } = file;
    console.log(data.toString());
  }

  res.send("hi");
});
